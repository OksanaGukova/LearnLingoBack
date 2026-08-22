import { TeacherCollection } from "../bd/models/teacher.js";
import { SORT_ORDER } from "../constans/index.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllTeachers = async ({ page, perPage = 4, sortBy = '_id', sortOrder = SORT_ORDER.ASD, filter = {}, }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const teachersQuery = TeacherCollection.find();
  if (filter.languages) {
    teachersQuery.where('languages').equals(filter.languages);
  }
  if (filter.levels) {
    teachersQuery.where('levels').equals(filter.levels);
  }
  if (filter.minRating) {
    teachersQuery.where('rating').gte(filter.minRating);
  }
  if (filter.maxRating) {
    teachersQuery.where('rating').lte(filter.maxRating);
  }
  if (filter.minPricePerHour) {
    teachersQuery.where('price_per_hour').gte(filter.minPricePerHour);
  }
  if (filter.maxPricePerHour) {
    teachersQuery.where('price_per_hour').lte(filter.maxPricePerHour);
  }
  if (filter.minLessonsDone) {
    teachersQuery.where('lessons_done').gte(filter.minLessonsDone);
  }
  if (filter.maxLessonsDone) {
    teachersQuery.where('lessons_done').lte(filter.maxLessonsDone);
  }

  const [teachersCount, teachers] = await Promise.all([
    TeacherCollection.find().merge(teachersQuery).countDocuments(),
    teachersQuery.skip(skip).sort({ [sortBy]: sortOrder }).limit(limit).exec(),
  ]);

  const paginationData = calculatePaginationData(teachersCount, perPage, page);
  return {
    data: teachers,
    ...paginationData,
  };
};

export const getTeacherById = async (teacherId) => {
  const teacher = await TeacherCollection.findById(teacherId);
  return teacher;
};

export const createTeacher = async (teacherData) => {
  const newTeacher = await TeacherCollection.create(teacherData);
  return newTeacher;
};

export const updateTeacher = async (teacherId, teacherData, options = {}) => {
  const updatedTeacher = await TeacherCollection.findByIdAndUpdate(
    teacherId,
    teacherData,
    { new: true }
  );
  if (!updatedTeacher) return null;
  return {
    updatedTeacher,
  };
};

export const deleteTeacher = async (teacherId) => {
  const deletedTeacher = await TeacherCollection.findByIdAndDelete(teacherId);
  return deletedTeacher;
};
