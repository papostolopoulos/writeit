const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 12;
const knex = require('../db/knex');


// USER SIGN UP
router.post('/users', (req, res, next) => {
  console.log("These come from the user signup form:");
  console.log(req.body);

  generatePassword(req.body.password);

  //See if the account already exists
  knex('users')
  .select()
  .where({email: req.body.email})
  .orWhere({username: req.body.username})
  .returning('*')
  .then((existingUsers) => {
    console.log("logs from the existingUsers");
    console.log(existingUsers);
    if (existingUsers.length > 0) {
      var existingUser = existingUsers[0];
      res.render('accountexists', existingUser);
    }

    // check in validation of user's entries
    else {
      //need to create a function for this. See bottom of page in functions section
    }
  });

  var hashedPassword = new Promise((resolve, rejesssct) => {
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
        console.log("Username from the sign up process: ");
        console.log(userName);
        console.log("---------");
        req.session.user = userName;
        req.session.cookie.maxAge = 10 * 24 * 60 * 60 //10 days long
        console.log("req.session.cookie from the signup: ");
        console.log(req.session.cookie);
        res.redirect(`/users/${userName}`)
      });
    })

}); //End of router.post




// USER LOGIN
router.post('/users/:username', (req, res, next) => {
  console.log("These come from the user login form. req.body:");
  console.log(req.body);

  knex('users')
  .select()
  .where({email: req.body.email})
  .returning('email')
  .then((usersEmails) => {

    //See if the account does not exist
    if (usersEmails.length === 0) {
      console.log("account does not exist");
      res.render('accountdoesnotexist',
      {
        email: req.body.email,
        title: "writeIt",
        user: "visitor"
      });
    }

    else {
      knex('users') //select table from db
      .select()
      .where({email: req.body.email})
      .returning('*')
      .then((loginUsers) =>{
        let loginUser = loginUsers[0];
        console.log("loginUser (from database): ");
        console.log(loginUser);
        console.log(bcrypt.compareSync(req.body.password, loginUser.password));
        // Compare passwords
        if (bcrypt.compareSync(req.body.password, loginUser.password) === true) {
          console.log("passwords match");
          req.session.user = loginUser.username;
          req.session.cookie.maxAge = 10 * 24 * 60 * 60 //10 days long
          // req.session.cookie.httpOnly = true;
          console.log("req.session.user: ");
          console.log(req.session.user);
          console.log(req.session);
          // let user = req.session.user;
          //req.cookies
          // res.cookie('cookie', 'monster', {
          //   domain: '/', //Domain name for cookie
          //   path: '/', //Path for cookie
          //   maxAge: 10 * 24 * 60 *60, //Days, hours, minutes, seconds Another example: new Date(Date.now() + 900000
          //   httpOnly: true //flags if the cookie should only be accessed from the server
          // }
          // ); //{ maxAge: 604800, httpOnly: true }
          res.redirect(`/articles/${loginUser.username}`)
        }
        else {
          res.render('accountdoesnotexist',
          {
            email: req.body.email,
            title: "writeIt",
            user: 'visitor'
          });
        }
      })
    } //end of TOP else
  });
});


// REDIRECT TO NEW POSTING PAGE
router.get('/newarticle', (req, res, next) => {
  console.log("req.session.user from the new posting redirect");
  console.log(req.session.user);
  if (req.session.user === undefined) {
    res.render('error', {
      user: "visitor",
      message: "404 - Restricted page",
    explanation: "Sorry but the page you are trying to access is restricted. You are either logged in as a different user or you are not logged in at all.",
    status: 404
    })
    console.log('something is wrong');
  }
  res.render('newarticle', {
    user: req.session.user
  });
});


//HOMEPAGE DISPLAY
router.get('/', function(req, res, next) {
  // console.log("req.cookies: ");
  // console.log(req.cookies); //first part of the cookie is the session id. Second part is the signature that signs the authentication to the server
  console.log('--------------');
  console.log('--------------');
  console.log('--------------');
  console.log("req.session: ");
  console.log(req.session);
  console.log("req.session.user: ");
  console.log(req.session.user);
  if (!req.session.user) {
    res.render('index',
    {
      title: 'writeIt',
      user: "visitor"
    });
  }
  else {
    res.render('index',
    {
      title: 'writeIt',
      user: req.session.user
    });
  }
});


//LOGOUT BUTTON
router.get('/logout', (req, res, next) => {
  console.log("LOGOUT: req session before");
  console.log(req.session);
  req.session.destroy(function (err) {
      res.render('index', {
        title: 'writeIt',
        user: "visitor"
      });
  });
  console.log("LOGOUT: req session after");
  console.log(req.session);
});


//ABOUT PAGE
router.get('/about', (req, res, next) => {
  res.render('about', {
    user: req.session.user || "visitor"
  })
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
