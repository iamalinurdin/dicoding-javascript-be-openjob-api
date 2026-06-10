import { nanoid } from "nanoid";
import { Pool } from "pg";

class ApplicationRepository {
  constructor() {
    this.pool = new Pool();
    this.table = "applications";
  }

  async getApplications() {
    const query = {
      text: `SELECT * FROM ${this.table}`,
    };
    const result = await this.pool.query(query);

    return result.rows;
  }

  async applyJob({ user_id, job_id, status = "pending" }) {
    const id = nanoid(10);
    const query = {
      text: `INSERT INTO ${this.table} (id, user_id, job_id, status) VALUES ($1, $2, $3, $4) RETURNING id`,
      values: [id, user_id, job_id, status],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async getApplicationById(id) {
    const query = {
      text: `SELECT * FROM ${this.table} WHERE id = $1`,
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async getApplicationByUserId(user_id) {
    const query = {
      text: `SELECT * FROM ${this.table} WHERE user_id = $1`,
      values: [user_id],
    };

    const result = await this.pool.query(query);

    return result.rows;
  }

  async getApplicationByJobId(job_id) {
    const query = {
      text: `SELECT * FROM ${this.table} WHERE job_id = $1`,
      values: [job_id],
    };

    const result = await this.pool.query(query);

    return result.rows;
  }

  async updateApplication({ id, status }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: `UPDATE ${this.table} SET status = $1, updated_at = $2 WHERE id = $3 RETURNING id`,
      values: [status, updatedAt, id],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async deleteApplication(id) {
    const query = {
      text: `DELETE FROM ${this.table} WHERE id = $1 RETURNING id`,
      values: [id],
    };
    const result = await this.pool.query(query);

    return result.rows[0].id;
  }
}

const applicationRepository = new ApplicationRepository();

export default applicationRepository;
