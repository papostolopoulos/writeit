var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


// DISPLAY ALL THE USERS
router.get('/', function(req, res, next) {
  knex('users') //table name
    .select() //select all
    .then((usersTable) => { //define and give me the content
      res.render('users', {usersTable: usersTable});
      //render(page to render, {property access: array we got from database}
    })
});


// Display one user account
router.get('/:username', function(req, res, next) {
  console.log("req.params:",req.params);
  let username = req.params.username; //get the username from the url

    knex('users')
    .select()
    .where({username: username})
    .returning('*')
    .then((users) => {
      let user = users[0];
      console.log(user);
      res.render('useraccount', user);
    });

});


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
