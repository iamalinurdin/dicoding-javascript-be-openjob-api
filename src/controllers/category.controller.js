import { InvariantError, NotFoundError } from "../exceptions/index.js";
import { categoryRepository } from "../repositories/index.js";
import { response } from "../utils/index.js";

export const getCategories = async (req, res, next) => {
  const categories = await categoryRepository.getCategories();

  response(res, 200, "success", categories);
};

export const createCategory = async (req, res, next) => {
  const { name } = req.validated;
  const category = await categoryRepository.createCategory(name);

  if (!category) {
    return next(new InvariantError("kategori gagal ditambahkan"));
  }

  response(res, 201, "success", category);
};

export const getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryRepository.getCategoryById(id);

  if (!category) {
    return next(new NotFoundError("kategori tidak ditemukan"));
  }

  response(res, 200, "success", category);
};

export const updateCategory = async (req, res, next) => {
  const { name } = req.validated;
  const { id } = req.params;
  const updatedCategory = await categoryRepository.updateCategory({
    id,
    name,
  });

  if (!updatedCategory) {
    return next(new NotFoundError("category tidak ditemukan"));
  }

  response(res, 200, "success", updatedCategory);
};

export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  const deletedCategory = await categoryRepository.deleteCategory(id);

  if (!deletedCategory) {
    return next(new NotFoundError("kategori tidak ditemukan"));
  }

  response(res, 200, "success", deletedCategory);
};
