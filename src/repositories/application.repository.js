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
      text: `
        SELECT 
          a.id as id,
          u.id as user_id,
          u.name as applicant_name,
          u.email as applicant_email,
          j.company_id as company_id,
          j.category_id as category_id,
          j.title as title,
          j.description as description,
          j.job_type as job_type,
          j.experience_level as experience_level,
          j.location_type as location_type,
          j.location_city as location_city,
          a.created_at as created_at
        FROM applications a
        JOIN users u
        ON u.id = a.user_id
        JOIN jobs j
        ON j.id = a.job_id
      `,
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
      const rows = result.rows;

      await this.cacheService.set(cacheKey, JSON.stringify(rows[0]));

      return {
        data: rows[0],
        source: "database",
      };
    }
  }

  async getApplicationByIdFromDb(id) {
    const query = {
      text: `SELECT * FROM jobs WHERE id = $1`,
      values: [id],
    };

    const result = await this.pool.query(query);
    const row = result.rows[0];

    return row;
  }

  async getApplicationByUserId(user_id) {
    const cacheKey = `applications_by_user:${user_id}`;

    try {
      const applications = await this.cacheService.get(cacheKey);

      return {
        data: JSON.parse(applications),
        source: "cache",
      };
    } catch (error) {
      const query = {
        text: `SELECT * FROM applications WHERE user_id = $1`,
        values: [user_id],
      };
      const result = await this.pool.query(query);
      const rows = result.rows;

      await this.cacheService.set(
        cacheKey,
        JSON.stringify({
          applications: rows,
        }),
      );

      return {
        data: {
          applications: rows,
        },
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
    const cacheKey = `application_by_id:${id}`;
    const query = {
      text: `DELETE FROM applications WHERE id = $1 RETURNING *`,
      values: [id],
    };
    const result = await this.pool.query(query);

    await this.cacheService.remove(cacheKey);

    return result.rows[0];
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
