/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("project_resources", (table) => {
    table.increments("project_resource_id");
    table
      .integer("project_id")
      .references("projects.project_id")
      .unsigned()
      .index()
      .onDelete("CASCADE");
    table
      .integer("resource_id")
      .references("resources.resource_id")
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
  return knex.schema.dropTable("project_resources");
};
