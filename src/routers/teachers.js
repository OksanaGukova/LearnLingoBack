import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper";
import { createTeacherController, deleteTeacherController, getAllTeachersController, getTeacherByIdController, updateTeacherController } from "../controllers/teacher";

const router = Router();

router.get("/", ctrlWrapper(getAllTeachersController));
router.get("/:teacherId", ctrlWrapper(getTeacherByIdController));
router.post("/", ctrlWrapper(createTeacherController));
router.put("/:teacherId", ctrlWrapper(updateTeacherController));
router.delete("/:teacherId", ctrlWrapper(deleteTeacherController));

export default router;
