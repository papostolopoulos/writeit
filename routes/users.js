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


// DISPLAY ONE USER ACCOUNT
router.get('/:username', function(req, res, next) {
  console.log("req.params:",req.params); //display what is in the url

    knex('users')
    .select()
    .where({username: req.params.username})
    .returning('*')
    .then((users) => {
      //If user does not exist
      if (users.length === 0) {
        res.render('userdoesnotexist');
      }
      //If someone tries to access a user page without being logged in as the user
      else if (req.params.username !== req.session.user) {
        console.log("req.params.username is ", req.params.username, "while req.session.user is", req.session.user, ". No match");
        res.render('error', {
          message: "Restricted page",
          explanation: "Sorry but the page you are trying to access is restricted. You are either logged in as a different user or you are not logged in as this user.",
          status: 404
        });
      }
      //Access to the user's account when logged in
      else {
        console.log(req.session);

        let user = users[0];
        console.log("users/:username: Logging the user info from the database: ");
        console.log(user);

        //create if statement where req.params.username has to match with the user

        res.render('useraccount', {
          username: user.username,
          user: user.username,
          email: user.email
        });
      }

    });

});


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
