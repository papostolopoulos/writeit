// | field      | datatype    |
// | :--------- | :---------- |
// | id         | int         |
// | username   | string      |
// | email      | string      |
// | password   | string      |


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      const userArr = [
        {
          id: 1,
          username: 'userOne',
          email: 'paris_apostolopoulos@yahoo.com',
          password: "thisIsAPasswordForUserOne"
        },
        {
          id: 2,
          username: "userTwo",
          email: "chaereed@gmail.com",
          password: "thisIsAPasswordForUserTwo"
        }
      ];

      return Promise.all(knex('users').insert(userArr))
      .catch(function (err) {
        console.log(err);
      });

    });
};
