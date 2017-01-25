// | field      | datatype    |
// | :--------- | :---------- |
// | id         | int         |
// | username   | string      |
// | email      | string      |
// | password   | string      |


exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments().primary();
    table.text('username').notNullable().unique();
    table.text('email').notNullable().unique();
    table.text('password').notNullable().unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
