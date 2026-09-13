import { ONE_DAY } from "../constans/index.js";
import { loginUser, logoutUser, refreshUserSession, registerUser } from "../services/auth.js";

export const registerUserController = async (req, res, next) => {
    const user = await registerUser(req.body);
    res.status(201).json({
        message: "User registered successfully",
        data: user,
    });
};

export const loginUserController = async (req, res, next) => {
    const user = await loginUser(req.body);
    res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
        secure: new Date(Date.now() + ONE_DAY),
    });
    res.cookie('sessionId', user.session._id, {
        httpOnly: true,
        secure: new Date(Date.now() + ONE_DAY),
    });
    res.status(200).json({
        message: "User logged in successfully",
        data: { accessToken: user.accessToken, },
    });

};

export const logoutUserController = async (req, res, next) => {
    if (req.cookies.sessionId) {
        await logoutUser(req.cookies.sessionId);
        res.clearCookie("refreshToken");
        res.clearCookie("sessionId");
        res.status(204).json({
            message: "User logged out successfully",
        });
    }
};


const setupSession = (res, session) => {
    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        secure: new Date(Date.now() + ONE_DAY),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        secure: new Date(Date.now() + ONE_DAY),
    });
};

export const refreshUserSessionController = async (req, res, next) => {
    const session = await refreshUserSession({ sessionId: req.cookies.sessionId, refreshToken: req.cookies.refreshToken });
    setupSession(res, session);
    res.status(200).json({
        message: "User session refreshed successfully",
        data: { accessToken: session.accessToken, },
    });
};
