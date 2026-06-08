import { InvariantError, NotFoundError } from "../exceptions/index.js";
import { applicationRepository } from "../repositories/index.js";
import { response } from "../utils/index.js";

export const getApplications = async (req, res, next) => {
  const applications = await applicationRepository.getApplications();

  response(res, 200, "success", applications);
};

export const applyJob = async (req, res, next) => {
  const { user_id, job_id, status } = req.validated;
  const application = await applicationRepository.applyJob({
    user_id,
    job_id,
    status,
  });

  if (!application) {
    return next(
      new InvariantError("gagal melamar pekerjaan. silakan coba lagi"),
    );
  }

  response(res, 200, "success", application);
};

export const getApplicationById = async (req, res, next) => {
  const { id } = req.params;
  const application = await applicationRepository.getApplicationById(id);

  if (!application) {
    return next(
      new NotFoundError("gagal melamar pekerjaan. silakan coba lagi"),
    );
  }

  response(res, 200, "success", application);
};

export const getApplicationByUserId = async (req, res, next) => {
  const { id } = req.params;
  const application = await applicationRepository.getApplicationByUserId(id);

  if (!application) {
    return next(
      new NotFoundError("gagal melamar pekerjaan. silakan coba lagi"),
    );
  }

  response(res, 200, "success", application);
};

export const getApplicationByJobId = async (req, res, next) => {
  const { id } = req.params;
  const application = await applicationRepository.getApplicationByJobId(id);

  if (!application) {
    return next(
      new NotFoundError("gagal melamar pekerjaan. silakan coba lagi"),
    );
  }

  response(res, 200, "success", application);
};

export const updateApplication = async (req, res, next) => {
  const { status } = req.validated;
  const { id } = req.params;
  const updatedApplication = await applicationRepository.updateApplication({
    id,
    status,
  });

  if (!updatedApplication) {
    return next(
      new InvariantError("gagal mengubah pekerjaan. silakan coba lagi"),
    );
  }

  response(res, 200, "success", updatedApplication);
};

export const deleteApplication = async (req, res, next) => {
  const { id } = req.params;
  const deletedApplication = await applicationRepository.deleteApplication(id);

  if (!deletedApplication) {
    return next(
      new InvariantError("gagal menghapus pekerjaan. silakan coba lagi"),
    );
  }

  response(res, 200, "success", deletedApplication);
};
