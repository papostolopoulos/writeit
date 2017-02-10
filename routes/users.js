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
  console.log("req.params from users/username");
  console.log(req.params); //display what is in the url

    knex('users')
    .select()
    .where({username: req.params.username})
    .returning('*')
    .then((users) => {
      //If user does not exist
      if (users.length === 0) {
        res.render ('error', {
          message: "403 - Forbidden",
          explanation: "Sorry, you are trying to access a user settings page while you are not logged in.",
          status: 403
        })
        // res.render('userdoesnotexist', {
        //   user: req.params.username
        // });
      }
      //If someone tries to access a user page without being logged in as the user
      else if (req.params.username !== req.session.user) {
        console.log("req.params.username is ", req.params.username, "while req.session.user is", req.session.user, ". No match");
        res.render('error', {
          user: req.session.user || "visitor",
          message: "404 - Restricted page",
          explanation: "Sorry but the page you are trying to access is restricted. You are either logged in as a different user or you are not logged in at all.",
          status: 404
        });
      }
      //Access to the user's account when logged in
      else {
        console.log(req.session);

        let user = users[0];
        console.log("users/:username: Logging the user info from the database: ");
        console.log(user);

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
