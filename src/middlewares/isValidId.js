import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const isValidId = (req, res, next) => {
  const { teacherId } = req.params;
  if (!isValidObjectId(teacherId)) {
    throw createHttpError(400, "bad request");
  }
    next();
};
