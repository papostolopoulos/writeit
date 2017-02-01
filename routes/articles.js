var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


// DISPLAY ALL THE POSTINGS
router.get('/', function(req, res, next) {
  knex('articles') //table name
    .select() //select all
    .innerJoin('users', 'articles.user_id', 'users.id')
    .orderBy('date', 'desc')
    .then(postings => { //define and give me the content
      res.render('articles', {
        postings: postings,
        user: req.session.user || 'visitor'
      });
      //render(page to render, {property access: array we got from database}
    })
});


// DISPLAY ARTICLES FROM ONLY ONE USER
router.get('/:username', function(req, res, next) {
  console.log("req.params:",req.params);
  let username = req.params.username; //get the username from the url

  //See if the user is signed in
  if (req.session.user === undefined) {
    res.render('error', {
      user: "visitor",
      message: "404 - Restricted page",
    explanation: "Sorry but the page you are trying to access is restricted. You are either logged in as a different user or you are not logged in at all.",
    status: 404
    })
  }
  else { //Get the
    // SELECT * FROM users INNER JOIN articles ON users.id = articles.user_id WHERE username='zoo' ORDER BY date DESC;
    knex
    .select()
    .table('articles')
    .innerJoin('users', 'articles.user_id', 'users.id')
    .where({username: username})
    .orderBy('date', 'desc')
    .returning('*')
    .then((postings) => {

      console.log(postings);
      console.log(req.session.user);
      res.render('userpostings', {
        postings: postings,
        user: req.session.user || "visitor"
      });
    });
  }

});



//POST ARTICLES AFTER THEY COME FROM THE NEW ARTICLE FORM - I NEED TO FIX THAT
router.post('/', (req, res, next) => {
  console.log("req.body coming from the post of new article");
  console.log(req.body);
  console.log("req.session.user coming from the post page");
  console.log(req.session.user);

  knex('users')
  .select()
  .where({username: req.session.user})
  .then((users) =>{
    let user = users[0];
    console.log(user.id);

    if (validEntry(req.body)) {
      let userPosting = {
        title: req.body.title,
        body: req.body.body,
        date: new Date(),
        user_id: user.id
      };
      knex('articles')
      .insert(userPosting, "id")
      .then(ids => {
        let id = ids[0];
        res.redirect('/articles/' + req.session.user);
      });
    }

    else {
      res.status(500);
      res.render('error', {
        message: "Invalid entry (coming from articles.js)"
      })
    }
  });


});


// FUNCTIONS
// VALIDATE THE USER ENTRIES ARE GOOD
function validEntry(userEntry) {
  return userEntry.title.trim() !== "" &&
  userEntry.body.trim() !== "";
}



module.exports = router;

// #### articles
// | field    | datatype         |
// | :--------| :-------------   |
// | id       | int              |
// | user_id  | int (fk) - users |
// | title    | string           |
// | body     | string           |
// | date     | datetime         |
