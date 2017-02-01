var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


// DISPLAY ALL THE POSTINGS
router.get('/', function(req, res, next) {
  knex('articles') //table name
    .select() //select all
    .innerJoin('users', 'articles.user_id', 'users.id')
    .then(postings => { //define and give me the content
      res.render('articles', {postings: postings});
      //render(page to render, {property access: array we got from database}
    })
});


// DISPLAY ARTICLES FROM ONLY ONE USER
router.get('/:username', function(req, res, next) {
  console.log("req.params:",req.params);
  let username = req.params.username; //get the username from the url

  // SELECT * FROM users INNER JOIN articles ON users.id = articles.user_id WHERE username='zoo';
  knex
  .select()
  .table('articles')
  .innerJoin('users', 'articles.user_id', 'users.id')
  .where({username: username})
  .returning('*')
  .then((postings) => {

    console.log(postings);
    res.render('userpostings', {
      postings: postings
    });
  });
});



//I NEED TO FIX THAT
router.post('/', (req, res, next) => {
  console.log(req.body);

  if (validEntry(req.body)) {
    let userPosting = {
      title: req.body.title,
      body: req.body.body,
      date: new Date()
    };
    knex('articles').insert(userPosting, "id")
    .then(ids => {
      let id = ids[0];
      res.redirect('/articles/' + id);
    });
  }

  else {
    res.status(500);
    res.render('error', {
      message: "Invalid entry (coming from articles.js)"
    })
  }
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
