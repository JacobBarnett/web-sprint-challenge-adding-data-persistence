/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tasks", (table) => {
    table.increments("task_id");
    table.string("task_description");
    table.string("task_notes");
    table.boolean("task_completed").defaultTo(false);
    table
      .integer("project_id")
      .references("projects.project_id")
      .unsigned()
      .index()
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("tasks");
};
