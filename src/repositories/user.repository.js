import { Pool } from "pg";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

class UserRepository {
  constructor() {
    this.pool = new Pool();
  }

  async createUser({ name, email, password, role }) {
    const id = nanoid(10);
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = {
      text: "INSERT INTO users (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      values: [id, name, email, hashedPassword, role],
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

  async verifyEmail(email) {
    const query = {
      text: "SELECT email FROM users WHERE email = $1",
      values: [email],
    };
    const result = await this.pool.query(query);

    return result.rows.length > 0;
  }

  async verifyUserCredential(email, password) {
    const query = {
      text: "SELECT id, password FROM users WHERE email = $1",
      values: [email],
    };
    const user = await this.pool.query(query);

    if (user.rows.length == 0) {
      return null;
    }

    const { id, password: hashedPassword } = user.rows[0];
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatch) {
      return null;
    }

    return id;
  }
}

const userRepository = new UserRepository();

export default userRepository;
