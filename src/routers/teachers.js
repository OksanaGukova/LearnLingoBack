import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createTeacherController, deleteTeacherController, getAllTeachersController, getTeacherByIdController, updateTeacherController } from "../controllers/teacher.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createTeacherSchema } from "../validations/teacher.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { checkRoles } from "../middlewares/checkRoles.js";
import { ROLES } from "../constans/index.js";


const router = Router();

router.use(authenticate);

router.get("/", checkRoles(ROLES.TEACHER, ROLES.PARENT), ctrlWrapper(getAllTeachersController));
router.get("/:teacherId", checkRoles(ROLES.TEACHER, ROLES.PARENT), isValidId, ctrlWrapper(getTeacherByIdController));
router.post("/", checkRoles(ROLES.TEACHER), validateBody(createTeacherSchema), ctrlWrapper(createTeacherController));
router.put("/:teacherId", checkRoles(ROLES.TEACHER), isValidId, validateBody(createTeacherSchema), ctrlWrapper(updateTeacherController));
router.delete("/:teacherId", checkRoles(ROLES.TEACHER), isValidId, ctrlWrapper(deleteTeacherController));

export default router;
