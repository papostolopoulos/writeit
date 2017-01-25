// #### comments
// | field      | datatype            |
// | :--------- | :------------------ |
// | id         | int                 |
// | user_id    | int (fk) - users    |
// | article_id | int (fk) - articles |
// | comment    | string              |
// | date       | datetime            |


exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', (table) => {
    table.increments().primary();
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.integer('article_id').references('id').inTable('articles').onDelete('CASCADE');
    table.text('comment').notNullable();
    table.datetime('date').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
