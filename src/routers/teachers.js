import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper";
import { createTeacherController, deleteTeacherController, getAllTeachersController, getTeacherByIdController, updateTeacherController } from "../controllers/teacher";
import { validateBody } from "../middlewares/validateBody";
import { createTeacherShema } from "../validations/teacher";
import { isValidId } from "../middlewares/isValidId";

const router = Router();

router.get("/", ctrlWrapper(getAllTeachersController));
router.get("/:teacherId", ctrlWrapper(getTeacherByIdController), isValidId);
router.post("/", ctrlWrapper(createTeacherController), validateBody(createTeacherShema));
router.put("/:teacherId", ctrlWrapper(updateTeacherController), validateBody(createTeacherShema), isValidId);
router.delete("/:teacherId", ctrlWrapper(deleteTeacherController), isValidId);

export default router;
