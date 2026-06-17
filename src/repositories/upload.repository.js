import { nanoid } from "nanoid";
import { Pool } from "pg";

class UploadRepository {
  constructor() {
    this.pool = new Pool();
  }

  async getDocuments() {
    const query = {
      text: "SELECT location FROM documents",
    };
    const result = await this.pool.query(query);

    return result.rows.map((item) => item.location);
  }

  async getDocumentById(id) {
    const query = {
      text: "SELECT * FROM documents WHERE document_id = $1",
      values: [id],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async createDocument({ documentId, location, size, originalName }) {
    const id = nanoid(10);
    const query = {
      text: "INSERT INTO documents (id, document_id, location, original_name, size) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      values: [id, documentId, location, originalName, size],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async deleteDocument(documentId) {
    const query = {
      text: "DELETE FROM documents WHERE document_id = $1 RETURNING id",
      values: [documentId],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }
}

const uploadRepository = new UploadRepository();

export default uploadRepository;
