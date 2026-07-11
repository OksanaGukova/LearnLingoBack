import { createTeacher, deleteTeacher, getAllTeachers, getTeacherById, updateTeacher } from "../services/teachers";

export const getAllTeachersController = async (req, res, next) => {
    try {
        const teachers = await getAllTeachers();
        res.status(200).json({
            data: teachers,
        });
    } catch (error) {
        next(error);
    };
};

export const getTeacherByIdController = async (req, res, next) => {
    try {
        const { teacherId } = req.params;
        const teacher = await getTeacherById(teacherId);
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.status(200).json({
            data: teacher,
        });
    } catch (error) {
        next(error);
    };
};

export const createTeacherController = async (req, res, next) => {
    try {
        const teacherData = req.body;
        const newTeacher = await createTeacher(teacherData);
        res.status(201).json({
            data: newTeacher,
        });
    } catch (error) {
        next(error);
    };
};

export const updateTeacherController = async (req, res, next) => {
    try {
        const { teacherId } = req.params;
        const teacherData = req.body;
        const updatedTeacher = await updateTeacher(teacherId, teacherData);
        if (!updatedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.status(200).json({
            data: updatedTeacher,
        });
    } catch (error) {
        next(error);
    };
};

export const deleteTeacherController = async (req, res, next) => {
    try {
        const { teacherId } = req.params;
        const deletedTeacher = await deleteTeacher(teacherId);
        if (!deletedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.status(200).json({
            message: "Teacher deleted successfully",
        });
    } catch (error) {
        next(error);
    };
};
