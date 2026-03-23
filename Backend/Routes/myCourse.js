const express = require("express");
const Course = require("../Models/Course.js");
const User = require("../Models/User.js");
const authMiddleware = require("../Middleware/authMiddleware.js")

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const course = await Course.create({
    title: req.body.title,
    description: req.body.description,
    subjectTag: req.body.subjectTag,
    backgroundColor: req.body.backgroundColor,
    instructor: req.user
  });
  res.status(201).json(course);
})


router.post("/:courseId/unit", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.units.push(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

})


router.post("/:courseId/unit/:unitId/chapter", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const units = course.units.find(u => u.id == req.params.unitId);
    if (!units) return res.status(404).json({ message: "Unit not found" });

    units.chapters.push(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})


router.post("/:courseId/unit/:unitId/chapter/:chapterId/lesson", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const units = course.units.find(u => u.id == req.params.unitId);
    if (!units) return res.status(404).json({ message: "Unit not found" });

    const chapter = units.chapters.find(c => c.id === req.params.chapterId);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    chapter.lessons.push(req.body);
    await course.save()
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})


router.post("/:courseId/unit/:unitId/chapter/:chapterId/lesson/:lessonId/content", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.instructor.toString() !== req.user.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const units = course.units.find(u => u.id == req.params.unitId);
    if (!units) return res.status(404).json({ message: "Unit not found" });

    const chapter = units.chapters.find(c => c.id === req.params.chapterId);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    const lesson = chapter.lessons.find(c => c.id === req.params.lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    lesson.content.push(req.body);
    await course.save()
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})


router.get("/createdCourses", authMiddleware, async (req, res) => {
  const courses = await Course.find({ instructor: req.user });
  res.status(201).json(courses);
})


router.get("/", authMiddleware, async (req, res) => {
  const courses = await Course.find({});
  res.status(201).json(courses);
})


router.post("/enroll", authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { enrolledCourses: courseId },
        $push: {
          courseProgress: {
            courseId,
            progress: 0,
            completedLessons: []
          }
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Enrolled successfully",
      enrolledCourses: updatedUser.enrolledCourses
    });

  } catch (error) {
    console.error("Enrollment error:", error);
    res.status(500).json({ message: "Server error during enrollment" });
  }
});


router.get("/my-courses", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user)
      .populate("enrolledCourses").lean();
    // .lean() makes the query faster by returning a plain JS object

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const progressArray = user.courseProgress?.map(c => ({
      courseId: c.courseId.toString(),
      progress: c.progress
    })) || [];
    
    // Return the populated array directly
    res.status(200).json({
      success: true,
      count: user.enrolledCourses.length,
      courses: user.enrolledCourses,
      progress: progressArray
    });

  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ message: "Server error fetching your courses" });
  }
});


// Put request to update
router.put("/:courseId", authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.instructor.toString() !== req.user.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, description, subjectTag, backgroundColor, units } = req.body;

    if (title !== undefined) {
      course.title = title;
    }
    if (description !== undefined) {
      course.description = description;
    }
    if (subjectTag !== undefined) {
      course.subjectTag = subjectTag;
    }
    if (backgroundColor !== undefined) {
      course.backgroundColor = backgroundColor;
    }
    if (units !== undefined) {
      course.units = units;
    }

    await course.save();
    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.post("/complete-lesson", authMiddleware, async (req, res) => {
  try {
    const { courseId, lessonId, progress } = req.body;
    const userId = req.user;
    const updated = await User.findOneAndUpdate(
      { _id: userId, "courseProgress.courseId": courseId },
      {
        $addToSet: { "courseProgress.$.completedLessons": lessonId },
        $set: { "courseProgress.$.progress": progress }
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Progress not found" });
    res.status(200).json({ success: true, message: "Lesson marked complete" });

  } catch (err) {
    console.log("error:", err.message);
    res.status(400).json({ error: err.message });
  }
});


router.post("/remove-lesson", authMiddleware, async (req, res) => {
  try {
    const { courseId, lessonId, progress } = req.body;
    const updated = await User.findOneAndUpdate(
      { _id: req.user, "courseProgress.courseId": courseId },
      {
        $pull: { "courseProgress.$.completedLessons": lessonId },
        $set: { "courseProgress.$.progress": progress }
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Progress not found" });
    }
    res.status(200).json({ success: true, message: "Lesson marked in-progress" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get("/progress/:courseId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const progress = user.courseProgress.find(c =>
      c.courseId.toString() === req.params.courseId
    );

    const lessonIds = (progress?.completedLessons || []).map(String);
    res.status(200).json(lessonIds);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get("/my-progress/:courseId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const progress = user.courseProgress.find(c =>
      c.courseId.toString() === req.params.courseId
    );

    const myProgress = progress ? progress.progress : 0;
    res.status(200).json({ progress: myProgress });
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ message: "Server error fetching progress" });
  }
});


module.exports = router;

