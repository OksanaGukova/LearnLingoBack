import { Router } from "express";
import { loginUserController, logoutUserController, refreshUserSessionController, registerUserController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserSchema } from "../validations/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));
router.post('/login', validateBody(registerUserSchema), ctrlWrapper(loginUserController));
router.post('/logout', ctrlWrapper(logoutUserController));
router.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default router;
