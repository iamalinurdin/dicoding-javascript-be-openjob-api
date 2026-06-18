import { NotFoundError } from "../exceptions/index.js";
import { companyRepository } from "../repositories/index.js";
import { response } from "../utils/index.js";

export const createCompany = async (req, res, next) => {
  const { name, location, description } = req.body;
  const company = await companyRepository.createCompany({
    name,
    location,
    description,
  });

  if (!company) {
    return next(new NotFoundError("perusahaan gagal ditambahkan"));
  }

  response(res, 201, "success", company);
};

export const getCompanies = async (req, res, next) => {
  const companies = await companyRepository.getCompanies();

  response(res, 200, "success", {
    companies,
  });
};

export const getCompanyById = async (req, res, next) => {
  const { id } = req.params;
  const { data: company, source } = await companyRepository.getCompanyById(id);

  if (!company) {
    return next(new NotFoundError("perusahaan tidak ditemukan"));
  }

  res.setHeader("X-Data-Source", source);

  response(res, 200, "success", company);
};

export const updateCompany = async (req, res, next) => {
  const { name, location, description = "-" } = req.validated;
  const { id } = req.params;
  const { data: updatedCompany, source } =
    await companyRepository.updateCompany({
      id,
      name,
      location,
      description,
    });

  if (!updatedCompany) {
    return next(new NotFoundError("perusahaan tidak ditemukan"));
  }

  res.setHeader("X-Data-Source", source);

  response(res, 200, "success", updatedCompany);
};

export const deleteCompany = async (req, res, next) => {
  const { id } = req.params;
  const deletedCompany = await companyRepository.deleteCompany(id);

  if (!deletedCompany) {
    return next(new NotFoundError("perusahaan tidak ditemukan"));
  }

  response(res, 200, "success", deletedCompany);
};
