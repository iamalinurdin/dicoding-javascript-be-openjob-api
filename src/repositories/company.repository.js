import { nanoid } from "nanoid";
import { Pool } from "pg";

class CompanyRepository {
  constructor() {
    this.pool = new Pool();
  }

  async getCompanies() {
    const query = {
      text: "SELECT * FROM companies",
    };
    const result = await this.pool.query(query);

    return result.rows;
  }

  async getCompanyById(id) {
    const query = {
      text: "SELECT * FROM companies WHERE id = $1",
      values: [id],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async createCompany({ name, location, description }) {
    const id = nanoid(10);
    const query = {
      text: "INSERT INTO companies (id, name, location, description) VALUES ($1, $2, $3, $4) RETURNING id",
      values: [id, name, location, description],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async updateCompany({ id, name, location, description }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: "UPDATE companies SET name = $1, location = $2, description = $3, updated_at = $4 WHERE id = $5 RETURNING id",
      values: [name, location, description, updatedAt, id],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async deleteCompany(id) {
    const query = {
      text: "DELETE FROM companies WHERE id = $1 RETURNING id",
      values: [id],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }
}

const companyRepository = new CompanyRepository();

export default companyRepository;
