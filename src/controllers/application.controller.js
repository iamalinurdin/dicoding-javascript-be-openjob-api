import { InvariantError, NotFoundError } from "../exceptions/index.js";
import ApplicationProducer from "../producers/application.producer.js";
import { applicationRepository } from "../repositories/index.js";
import { response } from "../utils/index.js";

export const getApplications = async (req, res, next) => {
  const applications = await applicationRepository.getApplications();

  response(res, 200, "success", {
    applications,
  });
};

export const applyJob = async (req, res, next) => {
  const { user_id, job_id, status } = req.validated;
  const getJob = await applicationRepository.getApplicationByIdFromDb(job_id);

  if (!getJob) {
    return next(
      new InvariantError(
        "gagal melamar pekerjaan karena pekerjaan tidak tersedia",
      ),
    );
  }

  const hasApplied = await applicationRepository.validateUserHasNotApply({
    user_id,
    job_id,
  });

  if (hasApplied) {
    return next(new InvariantError("you have been applied the job before"));
  }

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

  await ApplicationProducer.sendMessage(
    "application:apply",
    JSON.stringify({
      application_id: application.id,
    }),
  );

  response(res, 201, "success", application);
};

export const getApplicationById = async (req, res, next) => {
  const { id } = req.params;
  const { data: application, source } =
    await applicationRepository.getApplicationById(id);

  if (!application) {
    return next(
      new NotFoundError("gagal melamar pekerjaan. silakan coba lagi"),
    );
  }

  res.setHeader("X-Data-Source", source);

  response(res, 200, "success", application);
};

export const getApplicationByUserId = async (req, res, next) => {
  const { id } = req.params;
  const { data: applications, source } =
    await applicationRepository.getApplicationByUserId(id);

  res.setHeader("X-Data-Source", source);

  response(res, 200, "success", {
    applications,
  });
};

export const getApplicationByJobId = async (req, res, next) => {
  const { id } = req.params;
  const { data: applications, source } =
    await applicationRepository.getApplicationByJobId(id);

  res.setHeader("X-Data-Source", source);

  response(res, 200, "success", {
    applications,
  });
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
