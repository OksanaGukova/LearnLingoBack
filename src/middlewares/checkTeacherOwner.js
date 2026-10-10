import { TeacherCollection } from "../bd/models/teacher.js";
import { ROLES } from "../constans/index.js";

export const checkTeacherOwner = async (req, res, next) => {
    try {
        const { user } = req;

        if (!user) {
            return res.status(401).json({
                message: "User not authenticated",
            });
        }

        // Батьки не можуть редагувати дані вчителів
        if (user.role !== ROLES.TEACHER) {
            return res.status(403).json({
                message: "Only teachers can modify teacher information",
            });
        }

        const { teacherId } = req.params;

        if (!teacherId) {
            return res.status(400).json({
                message: "Teacher ID is required",
            });
        }

        const teacher = await TeacherCollection.findById(teacherId);

        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found",
            });
        }

        // Перевіряємо, чи належить профіль авторизованому вчителю
        if (teacher.userId.toString() !== user._id.toString()) {
            return res.status(403).json({
                message: "You can modify only your own information",
            });
        }

        next();
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
