import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createTeacherController, deleteTeacherController, getAllTeachersController, getTeacherByIdController, updateTeacherController } from "../controllers/teacher.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createTeacherSchema } from "../validations/teacher.js";
import { isValidId } from "../middlewares/isValidId.js";

const router = Router();

router.get("/", ctrlWrapper(getAllTeachersController));
router.get("/:teacherId", isValidId, ctrlWrapper(getTeacherByIdController));
router.post("/", ctrlWrapper(createTeacherController), validateBody(createTeacherSchema));
router.put("/:teacherId", isValidId, ctrlWrapper(updateTeacherController), validateBody(createTeacherSchema));
router.delete("/:teacherId", isValidId, ctrlWrapper(deleteTeacherController));

export default router;
