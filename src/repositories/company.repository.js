import { nanoid } from "nanoid";
import { Pool } from "pg";
import CacheService from "../services/cache.service.js";

class CompanyRepository {
  constructor() {
    this.pool = new Pool();
    this.cacheService = new CacheService();
  }

  async getCompanies() {
    const cacheKey = "companies:all";
    const companies = JSON.parse(await this.cacheService.get(cacheKey));

    if (Array(companies).length > 0) {
      return {
        data: companies,
        source: "cache",
      };
    }

    const query = {
      text: "SELECT * FROM companies",
    };
    const result = await this.pool.query(query);
    const rows = result.rows;

    await this.cacheService.set(cacheKey, JSON.stringify(rows));

    return {
      data: rows,
      source: "database",
    };
  }

  async getCompanyById(id) {
    const cacheKey = `company:${id}`;

    try {
      const company = await this.cacheService.get(cacheKey);

      return {
        data: JSON.parse(company),
        source: "cache",
      };
    } catch (error) {
      const query = {
        text: "SELECT * FROM companies WHERE id = $1",
        values: [id],
      };
      const result = await this.pool.query(query);
      const row = result.rows[0];

      if (row) {
        await this.cacheService.set(cacheKey, JSON.stringify(row));

        return {
          data: row,
          source: "database",
        };
      }

      return {
        data: null,
        source: "database",
      };
    }
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
    const cacheKey = `company:${id}`;
    const updatedAt = new Date().toISOString();
    const query = {
      text: "UPDATE companies SET name = $1, location = $2, description = $3, updated_at = $4 WHERE id = $5 RETURNING *",
      values: [name, location, description, updatedAt, id],
    };
    const result = await this.pool.query(query);
    const row = result.rows[0];

    await this.cacheService.remove(cacheKey);

    return {
      data: row,
      source: "database",
    };
  }

  async deleteCompany(id) {
    const cacheKey = `company:${id}`;
    const query = {
      text: "DELETE FROM companies WHERE id = $1 RETURNING *",
      values: [id],
    };
    const result = await this.pool.query(query);

    await this.cacheService.remove(cacheKey);

    return result.rows[0];
  }
}

const companyRepository = new CompanyRepository();

export default companyRepository;
