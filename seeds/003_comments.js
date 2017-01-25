// #### comments
// | field      | datatype            |
// | :--------- | :------------------ |
// | id         | int                 |
// | user_id    | int (fk) - users    |
// | article_id | int (fk) - articles |
// | comment    | string              |
// | date       | datetime            |


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      const commentsArr = [
        {
          id: 1,
          user_id: 2,
          article_id: 1,
          comment: "What do you mean by that exactly?",
          date: new Date()
        },
        {
          id: 2,
          user_id: 2,
          article_id: 3,
          comment: "Are you sure about that? Can you support it?",
          date: new Date()
        },
        {
          id: 3,
          user_id: 2,
          article_id: 3,
          comment: "Never mind, I figured this out",
          date: new Date()
        },
        {
          id: 4,
          user_id: 1,
          article_id: 2,
          comment: "Makes me want to have a souvlaki really bad...",
          date: new Date()
        }
      ];



      return Promise.all(knex('comments').insert(commentsArr))
        .catch(function(err) {
          console.log(err);
        });



    });
};
