import { userCollection } from "../bd/models/user.js";
import bcrypt from "bcrypt";
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from "../constans/index.js";
import { SessionsCollection } from "../bd/models/session.js";

export const registerUser = async (payload) => {
    const user = await userCollection.findOne({ email: payload.email });
    if (user) throw new Error(409, "User with this email already exists");

    const encryptedPassword = await bcrypt.hash(payload.password, 10);
    return await userCollection.create({ ...payload, password: encryptedPassword });
};

export const loginUser = async (payload) => {
    const user = await userCollection.findOne({ email: payload.email });
    if (!user) throw new Error(404, "User not found");

    const isPasswordValid = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordValid) throw new Error(401, "Invalid password");

    await userCollection.deleteOne({ userId: user._id });

    const accessToken = randomBytes(32).toString("hex");
    const refreshToken = randomBytes(32).toString("hex");

    return await userCollection.create(
        {
            userId: user._id,
            accessToken,
            refreshToken,
            accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
            refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
        }
    );
};

export const logoutUser = async (sessionId) => {
    const user = await userCollection.findOne({ _id: sessionId });
    if (!user) throw new Error(404, "User not found");

    await SessionsCollection.deleteOne({ _id: sessionId });
};


export const createSession = () => {
    const assessToken = randomBytes(32).toString("hex");
    const refreshToken = randomBytes(32).toString("hex");
    return {
        assessToken,
        refreshToken,
        assessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
    };
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
    const session = await SessionsCollection.findOne({ _id: sessionId, refreshToken });
    if (!session) throw new Error(404, "Session not found");

    const IsSessionTokenExpired = new Date(session.refreshTokenValidUntil) < new Date();
    if (IsSessionTokenExpired) throw new Error(401, "Session token expired");

    const newSession = createSession();
    await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });
    return await SessionsCollection.create({ userId: session.userId, ...newSession });
};
