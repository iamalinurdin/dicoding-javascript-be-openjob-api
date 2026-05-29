import { AuthenticationError, InvariantError } from "../exceptions/index.js";
import {
  authenticationRepository,
  userRepository,
} from "../repositories/index.js";
import { TokenManager } from "../security/index.js";
import response from "../utils/response.js";

export const login = async (req, res, next) => {
  const { email, password } = req.validated;
  const userId = await userRepository.verifyUserCredential(email, password);

  if (!userId) {
    return next(new AuthenticationError("Kredensial yang Anda berikan salah"));
  }

  const accessToken = TokenManager.generateAccessToken({ id: userId });
  const refreshToken = TokenManager.generateRefreshToken({ id: userId });

  await authenticationRepository.addRefreshToken(refreshToken);

  return response(res, 200, "Authentication berhasil ditambahkan", {
    accessToken,
    refreshToken,
  });
};

export const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.validated;

  const result =
    await authenticationRepository.verifyRefreshToken(refreshToken);

  if (!result) {
    return next(new InvariantError("Refresh token tidak valid"));
  }

  const { id } = TokenManager.verifyRefreshToken(refreshToken);
  const accessToken = TokenManager.generateAccessToken({ id });

  return response(res, 200, "Access Token berhasil diperbarui", {
    accessToken,
  });
};

export const logout = async (req, res, next) => {
  const { refreshToken } = req.validated;

  const result =
    await authenticationRepository.verifyRefreshToken(refreshToken);

  if (!result) {
    return next(new InvariantError("Refresh token tidak valid"));
  }

  await authenticationRepository.deleteRefreshToken(refreshToken);

  return response(res, 200, "Refresh token berhasil dihapus");
};
