import Joi from "joi";

export const createTeacherSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  language: Joi.array().items(Joi.string()).required(),
  levels: Joi.array().items(Joi.string()).required(),
  rating: Joi.number().required(),
    reviews: Joi.array().items(
    Joi.object({
      reviewer_name: Joi.string(),
      reviewer_rating: Joi.number(),
        comment: Joi.string(),
    })
  ),
  prise_per_hour: Joi.number().required(),
    lessons_done: Joi.number().required(),
    avatar_url: Joi.string().required(),
    Lessons_info: Joi.array().items(Joi.object()).required(),
    condition: Joi.array().items(Joi.string()).required(),
    experience: Joi.string().required(),
});


export const updateTeacherSchema = Joi.object({
  name: Joi.string(),
  surname: Joi.string(),
  language: Joi.array().items(Joi.string()),
  levels: Joi.array().items(Joi.string()),
  rating: Joi.number(),
    reviews: Joi.array().items(
    Joi.object({
      reviewer_name: Joi.string(),
      reviewer_rating: Joi.number(),
        comment: Joi.string(),
    })
  ),
  prise_per_hour: Joi.number(),
    lessons_done: Joi.number(),
    avatar_url: Joi.string(),
    Lessons_info: Joi.array().items(Joi.object()),
    condition: Joi.array().items(Joi.string()),
    experience: Joi.string(),
});
