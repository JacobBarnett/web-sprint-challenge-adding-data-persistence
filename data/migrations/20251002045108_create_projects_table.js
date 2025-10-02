/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // projects table
  await knex.schema.createTable('projects', (table) => {
    table.increments('project_id'); // primary key
    table.string('project_name', 128).notNullable();
    table.string('project_description');
    table.boolean('project_completed').defaultTo(false); // boolean
  });

  // resources table
  await knex.schema.createTable('resources', (table) => {
    table.increments('resource_id'); // primary key
    table.string('resource_name', 128).notNullable().unique();
    table.string('resource_description');
  });

  // tasks table
  await knex.schema.createTable('tasks', (table) => {
    table.increments('task_id'); // primary key
    table.string('task_description', 255).notNullable();
    table.string('task_notes');
    table.boolean('task_completed').defaultTo(false); // boolean
    table.integer('project_id') // foreign key to projects
      .unsigned()
      .notNullable()
      .references('project_id')
      .inTable('projects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });

  // project_resources table (many-to-many)
  await knex.schema.createTable('project_resources', (table) => {
    table.increments('project_resource_id'); // primary key
    table.integer('project_id')
      .unsigned()
      .notNullable()
      .references('project_id')
      .inTable('projects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.integer('resource_id')
      .unsigned()
      .notNullable()
      .references('resource_id')
      .inTable('resources')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.unique(['project_id', 'resource_id']); // prevent duplicates
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('project_resources');
  await knex.schema.dropTableIfExists('tasks');
  await knex.schema.dropTableIfExists('resources');
  await knex.schema.dropTableIfExists('projects');
};
