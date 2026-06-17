/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("documents", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    document_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    location: {
      type: "VARCHAR(255)",
      notNull: true,
    },
    original_name: {
      type: "VARCHAR(255)",
      notNull: true,
    },
    size: {
      type: "INTEGER",
      notNull: true,
    },
    created_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("documents");
};
