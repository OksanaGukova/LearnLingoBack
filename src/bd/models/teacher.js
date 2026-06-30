import { model, Schema } from "mongoose";

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  language: {
    type: [String],
    required: true,
  },
  levels: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
     reviews: [
      {
        reviewer_name: String,
        reviewer_rating: Number,
        comment: String,
      },
    ],
  prise_per_hour: {
    type: Number,
    required: true,
  },
  lessons_done: {
    type: Number,
    required: true,
  },
  avatar_url: {
    type: String,
    required: true,
  },
  Lessons_info: {
    type: Array,
    required: true,
  },
  condition: {
    type: [String],
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
});

export const TeacherCollection = model("Teacher", teacherSchema);
