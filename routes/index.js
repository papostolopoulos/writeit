const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-as-promised');
const saltRounds = 10;
const knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'writeIt' });
});


// post for the user login
router.post('/users', (req, res, next) => {
  console.log(req.body);
  console.log(req.body.loginPassword);
  bcrypt.hash(req.body.loginPassword, 12) //Generate a hashed password
    .then((hashed_password) => {
      console.log(req.body.loginEmail, hashed_password);
      res.render('users');
    })
    .catch((err) => {
      next(err);
    });
});


//post for the user signup
router.post('/articles', (req, res, next) => {
  console.log(req.body);
  bcrypt.genSalt(saltRounds, function (err, salt) { //generate salt
    bcrypt.hash(req.body.signupPassword, 12) //Generate a hashed password
    .then((hashed_password) => { //use hashed password in function
      const newUser = {
        username: req.body.signupUserName,
        email: req.body.signupEmail,
        password: hashed_password
      };

      return knex('users')
      .insert(newUser, '*')
    })
    .then((users) => {
      const user = users[0];
      delete user.hashed_password;
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
  });
});

// router.post('/articles', (r262eq, res, next) => {
//   console.log(req.body);
//   bcrypt.hash(req.body.signupPassword, 12) //Generate a hashed password
//     .then((hashed_password) => { //use hashed password in function
//
//       const newUser = {
//         username: req.body.signupUserName,
//         email: req.body.signupEmail,
//         password: hashed_password
//       };
//
//       return knex('users')
//         .insert(newUser, '*')
//     })
//     .then((users) => {
//       const user = users[0];
//       delete user.hashed_password;
//       res.send(user);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

module.exports = router;
