import Joi from "joi";

export const createApplicationSchema = Joi.object({
  user_id: Joi.string().required(),
  job_id: Joi.string().required(),
  status: Joi.string()
    .valid(
      "pending",
      "reviewed",
      "shortlisted",
      "interview",
      "accepted",
      "rejected",
    )
    .required(),
});

export const updateApplicationSchema = Joi.object({
  status: Joi.string()
    .valid(
      "pending",
      "reviewed",
      "shortlisted",
      "interview",
      "accepted",
      "rejected",
    )
    .required(),
});
