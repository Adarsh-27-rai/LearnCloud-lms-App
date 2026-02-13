const express = require("express");
const Course = require("../Models/Course.js");

const router = express.Router();

router.post("/", async (req, res) => {
    const course = await Course.create(req.body);
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

router.get("/:courseId", async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    res.status(201).json(course);
})

router.get("/", async (req,res) => {
    const courses = await Course.find({});
    res.status(201).json(courses);
})

module.exports = router;
