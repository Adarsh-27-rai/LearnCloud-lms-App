const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
    id: String,
    title: {type: String, required: true},
    type: {type: String, enum: ["video", "code", "text", "images"], default: "text" },
    isCompleted: {type: Boolean, default: false},
    duration: String,
    content: String,
    videoURL: String,
    imageURL: String
});

const ChapterSchema = new mongoose.Schema({
  id: String, // 'c1', 'c2'
  title: { type: String, required: true },
  lessons: [LessonSchema]
});

const UnitSchema = new mongoose.Schema({
  id: String, // 'u1', 'u2'
  title: { type: String, required: true },
  description: String,
  chapters: [ChapterSchema]
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  backgroundImg: String,
  progess: Number,
  units: [UnitSchema]
}, { timestamps: true });


module.exports = mongoose.model('Course', CourseSchema);