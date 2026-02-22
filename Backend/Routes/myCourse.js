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

router.get("/createdCourses", authMiddleware, async (req,res) => {
    const courses = await Course.find({instructor: req.user});
    res.status(201).json(courses);
})

router.get("/", authMiddleware, async (req,res) => {
    const courses = await Course.find({});
    res.status(201).json(courses);
})


router.post("/enroll", authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user; // or req.user._id depending on middleware

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { enrolledCourses: courseId } }, // prevents duplicates
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
    // Find user and populate the 'enrolledCourses' array with data from the 'Course' model
    const user = await User.findById(req.user)
      .populate("enrolledCourses").lean(); // .lean() makes the query faster by returning a plain JS object

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the populated array directly
    res.status(200).json({
      success: true,
      count: user.enrolledCourses.length,
      courses: user.enrolledCourses 
    });

  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ message: "Server error fetching your courses" });
  }
});

module.exports = router;
