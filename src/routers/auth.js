import { Router } from "express";
import { registerUserController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserSchema } from "../validations/auth.js";

const router = Router();

router.post('/register', validateBody(registerUserSchema), registerUserController);
router.post('/login', validateBody(registerUserSchema), registerUserController);

export default router;
