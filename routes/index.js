const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-as-promised');
const saltRounds = 10;
const knex = require('../db/knex');

//HOMEPAGE DISPLAY
router.get('/', function(req, res, next) {
  res.render('index', { title: 'writeIt' });
});


//USER SIGN UP
router.post('/users', (req, res, next) => {
  console.log("These come from the user signup form:");
  console.log(req.body);
  console.log(req.body.password);

  let userSignup = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }

  knex('users') //select table from db
  .insert(userSignup) //insert the variable with info and return the id
  .returning('username')
  .then((userNames) => {
    let userName = userNames[0];
    console.log(userName);
    res.redirect(`/users/${userName}`)
  });
});


// USER LOGIN
router.post('/users/:username', (req, res, next) => {
  console.log("These come from the user login form");
  console.log(req.body);
  let userInfo = {
    email: req.body.email,
    password: req.body.password
  }
  knex('users')
  .select()
  .where({email: userInfo.email})
  .returning('*')
  .then((users) => {
    console.log(users[0]);
    let user = users[0];
    console.log("user is", user.username);
    res.redirect(`/users/${user.username}`)
  });
});


//FUNCTIONS
// VALIDATE SIGN UP INFO
function validateSignupInfo (signupInfo) {
  /*NEED TO CONFIRM THAT THE ENTRIES ARE VALID
  CERTAIN TYPE OF PASSWORD,
  VADID AND NEW EMAIL,
  VALID AND NEW USERNAME*/
}


module.exports = router;
