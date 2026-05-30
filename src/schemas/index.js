import { companyCreateSchema, companyUpdateSchema } from "./company.schema.js";
import {
  loginSchema,
  refreshTokenSchema,
  logoutSchema,
} from "./auth.schema.js";
import {
  categoryCreateSchema,
  categoryUpdateSchema,
} from "./category.schema.js";
import { jobCreateSchema, jobUpdateSchema } from "./job.schema.js";

export {
  // company
  companyCreateSchema,
  companyUpdateSchema,
  // auth
  loginSchema,
  refreshTokenSchema,
  logoutSchema,
  // category
  categoryCreateSchema,
  categoryUpdateSchema,
  // job
  jobCreateSchema,
  jobUpdateSchema,
};
