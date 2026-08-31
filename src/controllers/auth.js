import { loginUser, registerUser } from "../services/auth.js";

export const registerUserController = async (req, res, next) => {
    const user = await registerUser(req.body);
    res.status(201).json({
        message: "User registered successfully",
        data: user,
    });
};

export const loginUserController = async (req, res, next) => {
    const user = await loginUser(req.body);
    res.status(200).json({
        message: "User logged in successfully",
        data: user,
    });
};
