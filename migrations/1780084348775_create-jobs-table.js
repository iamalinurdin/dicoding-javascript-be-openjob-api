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
  pgm.createTable("jobs", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    company_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    category_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    title: {
      type: "VARCHAR(255)",
      notNull: true,
    },
    description: {
      type: "TEXT",
      notNull: true,
    },
    job_type: {
      type: "VARCHAR(255)",
      notNull: true,
    },
    experience_level: {
      type: "VARCHAR(255)",
      notNull: true,
    },
    location_type: {
      type: "VARCHAR(255)",
      notNull: true,
    },
    salary_min: {
      type: "INTEGER",
      notNull: true,
    },
    salary_max: {
      type: "INTEGER",
      notNull: true,
    },
    is_salary_visible: {
      type: "BOOLEAN",
      default: true,
    },
    status: {
      type: "VARCHAR(255)",
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

  pgm.addConstraint("jobs", "unique_jobs", "UNIQUE(company_id, category_id)");
  pgm.addConstraint(
    "jobs",
    "fk_jobs.company_id_companies.id",
    "FOREIGN KEY(company_id) REFERENCES companies(id) ON DELETE CASCADE",
  );
  pgm.addConstraint(
    "jobs",
    "fk_jobs.category_id_categories.id",
    "FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE CASCADE",
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("jobs");
};
