var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 12;
var knex = require('../db/knex');


// DISPLAY ALL THE USERS
router.get('/', function(req, res, next) {
  knex('users') //table name
    .select() //select all
    .then((usersTable) => { //define and give me the content
      res.render('users', {
        usersTable: usersTable,
        user: req.session.user || "visitor"
      });
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
          email: user.email,
          password: user.password
        });
      }

    });

});


//USER UPDATE ACCOUNT INFO
router.put('/:username', function (req, res, next) {
  console.log("the form returned an update");
  console.log(req.body);

  knex('users')
  .select()
  .where({username: req.session.user})
  .then((users)=>{
    let user = users[0];

    // check in validation of user's entries. See function that you need to build in index page
    let userInfoUpdate = {};

    if (req.body.username !== "" && req.body.username !== req.body.existingUsername) {
      userInfoUpdate.username = req.body.username;
    }
    else {
      userInfoUpdate.username = req.body.existingUsername;
    }

    if (req.body.email !== "" && req.body.email !== req.body.existingEmail) {
      userInfoUpdate.email = req.body.email;
    }
    else {
      userInfoUpdate.email = req.body.existingEmail;
    }

    if (req.body.password === "" && req.body.newPassword !== "") { //The user did not enter his current password
      res.render('error', {
        user: req.session.user,
        message: "400 - Bad request",
      explanation: "Sorry but you need to enter your old password if you would like to update your new password. If you wish to update your password, please go back to your user settings page and enter both your existing and your new password",
      status: 400
      })
    }
    else if (req.body.password !== "" && req.body.newPassword !== "") { //The user entered his current password and a new password
      console.log(bcrypt.compareSync(req.body.password, user.password));
      // Compare passwords
      if (bcrypt.compareSync(req.body.password, user.password) === true) {//current password matches the password in the database
        console.log("passwords match");

        var hashedPassword = new Promise((resolve, reject) => {
          resolve(generatePassword(req.body.newPassword));
        });

        hashedPassword
        .then((pwd) =>{
          userInfoUpdate.password = pwd;
          console.log("password is: ", pwd);
          console.log(userInfoUpdate);
          knex('users')
          .select()
          .where({username: req.session.user})
          .update({
            username: userInfoUpdate.username,
            email: userInfoUpdate.email,
            password: userInfoUpdate.password
          })
          .then(()=>{
            console.log(userInfoUpdate);
            req.session.user = userInfoUpdate.username;
            req.session.cookie.maxAge = 10 * 24 * 60 * 60 //10 days long
            // req.session.cookie.httpOnly = true;
            res.render('updatesuccessful', {
              user: userInfoUpdate.username,
              username: userInfoUpdate.username,
              email: userInfoUpdate.email
            })
          })

        })
      }
      else if (req.body.password !== "" && req.body.newPassword === "") {//The user entered his existing password but did not enter a new password
        if (bcrypt.compareSync(req.body.password, user.password) === true) {//current password matches the password in the database

        }
      }
      else { //current password entry does not match the password in the database
        console.log("passwords do not match");
        res.render('error',
        {
        user: req.session.user,
        message: "400 - Bad request",
        explanation: "Sorry, your current password entry does not match the password we have in our database. Please go back and try again",
        status: 400
        });
      }
    }

  })
});


//FUNCTIONS
// SALT AND CALL HASH PASSWORD
function generatePassword(userPasswordEntry) {

  let salt = bcrypt.genSaltSync(saltRounds);
  console.log("This is the salt", salt);
  return hashPassword(userPasswordEntry, salt);
}


// HASH PASSWORD
function hashPassword(userPasswordEntry, salt) {
  let hash = bcrypt.hash(userPasswordEntry, salt) //hash password.
  console.log("This is the hash:", hash);
    // if (err) {
    //   res.render('error')
    // }
    return hash;
}

module.exports = router;
