// #### articles
// | field    | datatype         |
// | :--------| :-------------   |
// | id       | int              |
// | user_id  | int (fk) - users |
// | title    | string           |
// | body     | string           |
// | date     | datetime         |



exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', (table) => {
    table.increments().primary();
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.text('title').notNullable();
    table.text('body').notNullable();
    table.datetime('date').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles');
};
