import Joi from "joi";

export const jobCreateSchema = Joi.object({
  company_id: Joi.string().required(),
  category_id: Joi.string().required(),
  title: Joi.string().max(255).required(),
  description: Joi.string().required(),
  job_type: Joi.string()
    .valid("full-time", "part-time", "contract", "internship", "freelance")
    .required(),
  experience_level: Joi.string().valid("junior", "mid", "senior").required(),
  location_type: Joi.string().valid("onsite", "hybrid", "remote").required(),
  location_city: Joi.string().max(255).required(),
  salary_min: Joi.number().integer().min(0).required(),
  salary_max: Joi.number().integer().min(Joi.ref("salary_min")).required(),
  is_salary_visible: Joi.boolean().required(),
  status: Joi.string().valid("open", "closed", "draft").required(),
});

export const jobUpdateSchema = Joi.object({
  company_id: Joi.string().required(),
  category_id: Joi.string().required(),
  title: Joi.string().max(255).required(),
  description: Joi.string().required(),
  job_type: Joi.string()
    .valid("full-time", "part-time", "contract", "internship", "freelance")
    .required(),
  experience_level: Joi.string().valid("junior", "mid", "senior").required(),
  location_type: Joi.string().valid("onsite", "hybrid", "remote").required(),
  location_city: Joi.string().max(255).required(),
  salary_min: Joi.number().integer().min(0).required(),
  salary_max: Joi.number().integer().min(Joi.ref("salary_min")).required(),
  is_salary_visible: Joi.boolean().required(),
  status: Joi.string().valid("open", "close", "draft").required(),
});
