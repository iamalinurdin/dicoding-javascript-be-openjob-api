import Joi from "joi";

export const categoryCreateSchema = Joi.object({
  name: Joi.string().required(),
});

export const categoryUpdateSchema = Joi.object({
  name: Joi.string().required(),
});
