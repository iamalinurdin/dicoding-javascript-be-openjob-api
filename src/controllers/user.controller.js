import { InvariantError, NotFoundError } from "../exceptions/index.js";
import { userRepository } from "../repositories/index.js";
import { response } from "../utils/index.js";

export const createUser = async (req, res, next) => {
  const { name, email, role, password } = req.body;
  const emailUsed = await userRepository.verifyEmail(email);

  if (emailUsed) {
    return next(new InvariantError("email sudah digunakan"));
  }

  const user = await userRepository.createUser({
    email,
    password,
    role,
    name,
  });

  if (!user) {
    return next(new InvariantError("user gagal ditambahkan"));
  }

  response(res, 201, "success", user);
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await userRepository.getUserById(id);

  if (!user) {
    return next(new NotFoundError("user tidak ditemukan"));
  }

  response(res, 200, "success", user);
};

export const profile = async (req, res, next) => {
  const { id } = req.user;
  const user = await userRepository.getUserById(id);

  if (!user) {
    return next(new NotFoundError("user tidak ditemukan"));
  }

  response(res, 200, "success", user);
};
