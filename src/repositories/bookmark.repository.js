import { nanoid } from "nanoid";
import { Pool } from "pg";
import CacheService from "../services/cache.service.js";

class BookmarkRepository {
  constructor() {
    this.pool = new Pool();
    this.cacheService = new CacheService();
  }

  async getBookmarks(user_id) {
    const cacheKey = `bookmarks:${user_id}`;

    try {
      const bookmarks = await this.cacheService.get(cacheKey);

      return {
        // data: [],
        data: JSON.parse(bookmarks),
        source: "cache",
      };
    } catch (error) {
      const query = {
        text: `
SELECT
  b.id AS id,
  b.user_id AS user_id,
  b.job_id AS job_id,

  u.name AS user_name,
  u.email AS user_email,

  j.company_id AS company_id,
  j.category_id AS category_id,
  j.title AS title,
  j.description AS description,
  j.job_type AS job_type,
  j.experience_level AS experience_level,
  j.location_type AS location_type,
  j.location_city AS location_city,
  j.salary_min AS salary_min,
  j.salary_max AS salary_max,
  j.is_salary_visible AS is_salary_visible,

  c.name AS company_name,
  c.location AS company_location

FROM bookmarks b

JOIN users u
  ON u.id = b.user_id

JOIN jobs j
  ON j.id = b.job_id

JOIN companies c
  ON c.id = j.company_id

WHERE b.user_id = $1;
        `,
        values: [user_id],
      };
      const result = await this.pool.query(query);
      const rows = result.rows;

      if (rows.length > 0) {
        await this.cacheService.set(cacheKey, JSON.stringify(rows));

        return {
          data: rows,
          source: "database",
        };
      }

      return {
        data: [],
        source: "database",
      };
    }
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
