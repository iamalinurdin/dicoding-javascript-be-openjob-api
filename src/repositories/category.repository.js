import { Pool } from "pg";
import { nanoid } from "nanoid";

class CategoryRepository {
  constructor() {
    this.pool = new Pool();
  }

  async getCategories() {
    const query = {
      text: "SELECT * FROM categories",
    };
    const result = await this.pool.query(query);

    return result.rows;
  }

  async createCategory(name) {
    const id = nanoid(10);
    const query = {
      text: "INSERT INTO categories (id, name) VALUES ($1, $2) RETURNING id",
      values: [id, name],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async getCategoryById(id) {
    const query = {
      text: "SELECT * FROM categories WHERE id = $1",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async updateCategory({ id, name }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: "UPDATE categories SET name = $1, updated_at = $2 WHERE id = $3 RETURNING id",
      values: [name, updatedAt, id],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async deleteCategory(id) {
    const query = {
      text: "DELETE FROM categories WHERE id = $1 RETURNING id",
      values: [id],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }
}

const categoryRepository = new CategoryRepository();

export default categoryRepository;
