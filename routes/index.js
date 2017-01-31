const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 12;
const knex = require('../db/knex');




//HOMEPAGE DISPLAY
router.get('/', function(req, res, next) {
  res.render('index', { title: 'writeIt' });
});


// REDIRECT TO NEW POSTING PAGE
router.get('/newarticle', (req, res, next) => {
  res.render('newarticle');
});



// USER SIGN UP
router.post('/users', (req, res, next) => {
  console.log("These come from the user signup form:");
  console.log(req.body);
  console.log(req.body.password);

  generatePassword(req.body.password);

  //See if the account already exists
  knex('users')
  .select()
  .where({email: req.body.email})
  .returning('email')
  .then((usersEmails) => {
    if (usersEmails.length > 0) {
      var userEmail = usersEmails[0];
      res.render('accountexists', userEmail);
    }

    // check in validation of user's entries
    else {

    }
  });

  var hashedPassword = new Promise((resolve, reject) => {
      resolve(generatePassword(req.body.password));
  });


  hashedPassword
    .then((pwd) =>{
      console.log("password is: ", pwd);

      // Set user object
      let userSignUp = {
        username: req.body.username,
        email: req.body.email,
        password: pwd
      }
      return userSignUp;
    })
    .then((newUser) => {
      //sign up user
      knex('users') //select table from db
      .insert(newUser) //insert the variable with info and return the id
      .returning('username')
      .then((userNames) => {
        let userName = userNames[0];
        console.log(userName);
        res.redirect(`/users/${userName}`)
      });
    })

}); //End of router.post






// USER LOGIN
router.post('/users/:username', (req, res, next) => {
  console.log("These come from the user login form");
  console.log(req.body);

  //See if the account does not exist
  knex('users')
  .select()
  .where({email: req.body.email})
  .returning('email')
  .then((usersEmails) => {
    if (usersEmails.length === 0) {
      console.log("account does not exist");
      res.render('accountdoesnotexist',
      {
        email: req.body.email,
        title: "writeIt"
      });
    }

    // Compare passwords
    else {

      var hashedPassword = new Promise((resolve, reject) => {
          resolve(generatePassword(req.body.password));
      });

      hashedPassword
      .then((pwd) => {
        console.log("This is the pwd:", pwd);
        let userLogin = {
          email: req.body.email,
          password: pwd
        }

        knex('users') //select table from db
        .select()
        .where({email: userLogin.email})
        .returning('*')
        .then((loginUsers) =>{
          let loginUser = loginUsers[0];
          console.log("loginUser (from database): ");
          console.log(loginUser);
          console.log("userLogin (from req.body, hashed pwd): ");
          console.log(userLogin);
          if (userLogin.password !== loginUser.password) {
            res.render('accountdoesnotexist',
            {
              email: req.body.email,
              title: "writeIt"
            });
          }
          else {
            res.redirect(`/users/${userName}`)
          }
        })
      })

    } //end of else
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
