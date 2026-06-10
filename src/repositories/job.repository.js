import { nanoid } from "nanoid";
import { Pool } from "pg";

class JobRepository {
  constructor() {
    this.pool = new Pool();
  }

  async getJobs() {
    const query = {
      text: "SELECT * FROM jobs",
    };
    const result = await this.pool.query(query);

    return result.rows;
  }

  async getJobById(id) {
    const query = {
      text: "SELECT * FROM jobs WHERE id = $1",
      values: [id],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async getJobByCompany(company) {
    const query = {
      text: "SELECT * FROM jobs WHERE company_id = $1",
      values: [company],
    };
    const result = await this.pool.query(query);

    return result.rows;
  }

  async getJobByCategory(category) {
    const query = {
      text: "SELECT * FROM jobs WHERE category_id = $1",
      values: [category],
    };
    const result = await this.pool.query(query);

    return result.rows;
  }

  async createJob({
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status,
  }) {
    const id = nanoid(10);
    const query = {
      text: "INSERT INTO jobs (id, company_id, category_id, title, description, job_type, experience_level, location_type, location_city, salary_min, salary_max, is_salary_visible, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id",
      values: [
        id,
        company_id,
        category_id,
        title,
        description,
        job_type,
        experience_level,
        location_type,
        location_city,
        salary_min,
        salary_max,
        is_salary_visible,
        status,
      ],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async updateJob({
    id,
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status,
  }) {
    const updatedAt = new Date().toISOString();
    console.log(id);
    const query = {
      text: "UPDATE jobs SET company_id = $1, category_id = $2, title = $3, description = $4, job_type = $5, experience_level = $6, location_type = $7, location_city = $8, salary_min = $9, salary_max = $10, is_salary_visible = $11, status = $12, updated_at = $13 WHERE id = $14 RETURNING id",
      values: [
        company_id,
        category_id,
        title,
        description,
        job_type,
        experience_level,
        location_type,
        location_city,
        salary_min,
        salary_max,
        is_salary_visible,
        status,
        updatedAt,
        id,
      ],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async deleteJob(id) {
    const query = {
      text: "DELETE FROM jobs WHERE id = $1 RETURNING id",
      values: [id],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }
}

const jobRepository = new JobRepository();

export default jobRepository;
