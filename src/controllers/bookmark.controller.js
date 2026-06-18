import { InvariantError, NotFoundError } from "../exceptions/index.js";
import { bookmarkRepository } from "../repositories/index.js";
import { response } from "../utils/index.js";

export const getBookmarks = async (req, res, next) => {
  const { id } = req.user;
  const { data: bookmarks, source } = await bookmarkRepository.getBookmarks(id);

  res.setHeader("X-Data-Source", source);

  response(res, 200, "success", {
    bookmarks,
  });
};

export const addBookmark = async (req, res, next) => {
  const { jobId } = req.params;
  const { id } = req.user;
  const bookmark = await bookmarkRepository.addBookmark({
    user_id: id,
    job_id: jobId,
  });

  if (!bookmark) {
    return next(new InvariantError("bookmark gagal ditambahkan"));
  }

  response(res, 201, "success", bookmark);
};

export const getBookmarkById = async (req, res, next) => {
  const { id, jobId } = req.params;
  const bookmark = await bookmarkRepository.getBookmarkById({
    id,
    job_id: jobId,
  });

  if (!bookmark) {
    return next(new NotFoundError("bookmark tidak ditemukan"));
  }

  response(res, 200, "success", bookmark);
};

export const deleteBookmark = async (req, res, next) => {
  const { jobId } = req.params;
  const { id } = req.user;

  const deletedBookmark = await bookmarkRepository.deleteBookmark({
    user_id: id,
    job_id: jobId,
  });

  if (!deletedBookmark) {
    return next(new NotFoundError("bookmark tidak ditemukan"));
  }

  response(res, 200, "success", deletedBookmark);
};
