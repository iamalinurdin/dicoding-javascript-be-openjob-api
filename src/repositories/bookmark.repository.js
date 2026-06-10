import { nanoid } from "nanoid";
import { Pool } from "pg";

class BookmarkRepository {
  constructor() {
    this.pool = new Pool();
    this.table = "bookmarks";
  }

  async getBookmarks(user_id) {
    const query = {
      text: `SELECT * FROM bookmarks WHERE user_id = $1`,
      values: [user_id],
    };
    const result = await this.pool.query(query);

    return result.rows;
  }

  async addBookmark({ user_id, job_id }) {
    const id = nanoid(10);
    const query = {
      text: `INSERT INTO bookmarks (id, user_id, job_id) VALUES ($1, $2, $3) RETURNING id`,
      values: [id, user_id, job_id],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async getBookmarkById({ id, job_id }) {
    const query = {
      text: `
        SELECT
          b.id,
          b.user_id,
          b.created_at,
          j.id AS job_id,
          j.company_id,
          j.category_id,
          j.title,
          j.description,
          j.job_type,
          j.experience_level,
          j.location_type,
          j.location_city,
          j.salary_min,
          j.salary_max,
          j.is_salary_visible,
          j.status
        FROM bookmarks b
        INNER JOIN jobs j
            ON j.id = b.job_id
        WHERE b.id = $1
        AND b.job_id = $2;
      `,
      values: [id, job_id],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async deleteBookmark({ user_id, job_id }) {
    const query = {
      text: `DELETE FROM bookmarks WHERE user_id = $1 AND job_id = $2 RETURNING id;`,
      values: [user_id, job_id],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }
}

const bookmarkRepository = new BookmarkRepository();

export default bookmarkRepository;
