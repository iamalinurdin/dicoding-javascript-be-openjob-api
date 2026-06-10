import { InvariantError, NotFoundError } from "../exceptions/index.js";
import { jobRepository } from "../repositories/index.js";
import { response } from "../utils/index.js";

export const getJobs = async (req, res, next) => {
  const jobs = await jobRepository.getJobs();

  response(res, 200, "success", {
    jobs,
  });
};

export const getJobById = async (req, res, next) => {
  const { id } = req.params;
  const job = await jobRepository.getJobById(id);

  if (!job) {
    return next(new NotFoundError("pekerjaan tidak ditemukan"));
  }

  response(res, 200, "success", job);
};

export const getJobByCompany = async (req, res, next) => {
  const { companyId } = req.params;
  const jobs = await jobRepository.getJobByCompany(companyId);

  response(res, 200, "success", {
    jobs,
  });
};

export const getJobByCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const jobs = await jobRepository.getJobByCategory(categoryId);

  response(res, 200, "success", {
    jobs,
  });
};

export const createJob = async (req, res, next) => {
  const {
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status,
  } = req.validated;
  const job = await jobRepository.createJob({
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status,
  });

  if (!job) {
    return next(new InvariantError("pekerjaan gagal disimpan"));
  }

  response(res, 201, "success", job);
};

export const updateJob = async (req, res, next) => {
  const { id } = req.params;
  const {
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status,
  } = req.validated;
  const updatedJob = await jobRepository.updateJob({
    id,
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status,
  });

  if (!updatedJob) {
    return next(new InvariantError("pekerjaan gagal diubah"));
  }

  response(res, 200, "success", updatedJob);
};

export const deleteJob = async (req, res, next) => {
  const { id } = req.params;
  const deletedJob = await jobRepository.deleteJob(id);

  if (!deletedJob) {
    return next(new NotFoundError("pekerjaan tidak ditemukan"));
  }

  response(res, 200, "success", deletedJob);
};
