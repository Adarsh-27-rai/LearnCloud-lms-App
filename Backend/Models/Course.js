const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  type: {type: String, enum: ["video", "code", "text", "images"], default: "text" },
  title: String,
  value: String,
  filename: String,
  videoURL: String,
  imageURL: String,
  caption: String
});

const LessonSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  title: {type: String, required: true},
  type: {type: String, enum: ["video", "code", "text", "images"], default: "text" },
  // isCompleted: {type: Boolean, default: false},
  duration: String,
  content: [ContentSchema],
});

const ChapterSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  title: { type: String, required: true },
  lessons: [LessonSchema]
});

const UnitSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  title: { type: String, required: true },
  description: String,
  chapters: [ChapterSchema]
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  backgroundColor: String,
  progress: {type: Number, default: 0},
  instructor: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
  },
  subjectTag: String,
  totalStudents: {type: Number, default: 0},
  units: [UnitSchema]
}, { timestamps: true });


module.exports = mongoose.model('Course', CourseSchema);