import { createUser, getUserById } from "./user.controller.js";
import {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "./company.controller.js";
import { login, logout, refreshToken } from "./authentication.controller.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "./category.controller.js";
import {
  getJobs,
  getJobById,
  getJobByCategory,
  getJobByCompany,
  createJob,
  updateJob,
  deleteJob,
} from "./job.controller.js";

export {
  // users
  createUser,
  getUserById,
  // companies
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  // auth
  login,
  logout,
  refreshToken,
  // category
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  // job
  getJobs,
  getJobById,
  getJobByCategory,
  getJobByCompany,
  createJob,
  updateJob,
  deleteJob,
};
