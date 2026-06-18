import { nanoid } from "nanoid";
import { Pool } from "pg";
import CacheService from "../services/cache.service.js";

class ApplicationRepository {
  constructor() {
    this.pool = new Pool();
    this.cacheService = new CacheService();
  }

  async getApplications() {
    const query = {
      text: `SELECT * FROM applications`,
    };
    const result = await this.pool.query(query);

    return result.rows;
  }

  async applyJob({ user_id, job_id, status = "pending" }) {
    const cacheKey = `applications_by_user:${user_id}`;
    const id = nanoid(10);
    const query = {
      text: `INSERT INTO applications (id, user_id, job_id, status) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [id, user_id, job_id, status],
    };
    const result = await this.pool.query(query);

    await this.cacheService.remove(cacheKey);

    return result.rows[0];
  }

  async getApplicationById(id) {
    const cacheKey = `application_by_id:${id}`;

    try {
      const application = await this.cacheService.get(cacheKey);

      return {
        data: JSON.parse(application),
        source: "cache",
      };
    } catch (error) {
      const query = {
        text: `SELECT * FROM applications WHERE id = $1`,
        values: [id],
      };

      const result = await this.pool.query(query);
      const row = result.rows[0];

      await this.cacheService.set(cacheKey, JSON.stringify(row));

      return {
        data: row,
        source: "database",
      };
    }
  }

  async getApplicationByUserId(user_id) {
    const cacheKey = `applications_by_user:${user_id}`;

    try {
      const application = await this.cacheService.get(cacheKey);

      return {
        data: JSON.parse(application),
        source: "cache",
      };
    } catch (error) {
      const query = {
        text: `SELECT * FROM applications WHERE user_id = $1`,
        values: [user_id],
      };

      const result = await this.pool.query(query);
      const rows = result.rows;

      await this.cacheService.set(cacheKey, JSON.stringify(rows));

      return {
        data: rows,
        source: "database",
      };
    }
  }

  async getApplicationByJobId(job_id) {
    const cacheKey = `applications_by_job:${job_id}`;

    try {
      const application = await this.cacheService.get(cacheKey);

      return {
        data: JSON.parse(application),
        source: "cache",
      };
    } catch (error) {
      const query = {
        text: `SELECT * FROM applications WHERE job_id = $1`,
        values: [job_id],
      };

      const result = await this.pool.query(query);
      const rows = result.rows;

      await this.cacheService.set(cacheKey, JSON.stringify(rows));

      return {
        data: rows,
        source: "database",
      };
    }
  }

  async updateApplication({ id, status }) {
    const cacheKey = `application_by_id:${id}`;
    const updatedAt = new Date().toISOString();
    const query = {
      text: `UPDATE applications SET status = $1, updated_at = $2 WHERE id = $3 RETURNING *`,
      values: [status, updatedAt, id],
    };
    const result = await this.pool.query(query);

    await this.cacheService.remove(cacheKey);

    return result.rows[0];
  }

  async deleteApplication(id) {
    const query = {
      text: `DELETE FROM applications WHERE id = $1 RETURNING id`,
      values: [id],
    };
    const result = await this.pool.query(query);

    return result.rows[0].id;
  }

  async validateUserHasNotApply({ user_id, job_id }) {
    const query = {
      text: "SELECT * FROM applications WHERE user_id = $1 AND job_id = $2",
      values: [user_id, job_id],
    };
    const result = await this.pool.query(query);

    return result.rowCount;
  }
}

const applicationRepository = new ApplicationRepository();

export default applicationRepository;
