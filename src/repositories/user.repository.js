import { Pool } from "pg";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

class UserRepository {
  constructor() {
    this.pool = new Pool();
  }

  async createUser({ name, email, password, role }) {
    const username = nanoid(8).toString();
    const query = {
      text: "INSERT INTO users (name, email, username, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      values: [name, email, username, password, role],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async getUserById(id) {
    const query = {
      text: "SELECT * FROM users WHERE id = $1",
      values: [id],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }
}

const userRepository = new UserRepository();

export default userRepository;
