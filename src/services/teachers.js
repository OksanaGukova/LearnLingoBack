import { TeacherCollection } from "../bd/models/teacher.js";

export const getAllTeachers = async () => {
    const teachers = await TeacherCollection.find();
    return teachers;
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
