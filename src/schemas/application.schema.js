import Joi from "joi";

export const createApplicationSchema = Joi.object({
  user_id: Joi.string().required(),
  job_id: Joi.string().required(),
  status: Joi.string().required(),
});

export const updateApplicationSchema = Joi.object({
  status: Joi.string().required(),
});
