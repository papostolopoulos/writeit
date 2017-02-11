var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


// DISPLAY ALL THE POSTS
router.get('/', function(req, res, next) {
  knex('articles') //table name
    .select('articles.id', 'articles.user_id', 'articles.title', 'articles.body', 'articles.date', 'users.username', 'users.email') //select all
    .innerJoin('users', 'articles.user_id', 'users.id')
    .orderBy('date', 'desc')
    .then(postings => { //define and give me the content
      console.log(postings);
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
      message: "403 - Forbidden Access",
    explanation: "Sorry but the page you are trying to access is restricted. You are either logged in as a different user or you are not logged in at all.",
    status: 403
    })
  }
  else { //Get the
    // SELECT * FROM users INNER JOIN articles ON users.id = articles.user_id WHERE username='zoo' ORDER BY date DESC;
    knex
    .select('articles.id', 'articles.user_id', 'articles.title', 'articles.body', 'articles.date', 'users.username', 'users.email')
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


//DISPLAY ARTICLES FROM ONLY ONE USER BUT FOR OTHER USERS TO SEE
router.get('/pages/:username', function(req, res, next) {
  console.log("req.params:",req.params);
  let username = req.params.username; //get the username from the url

  // SELECT * FROM users INNER JOIN articles ON users.id = articles.user_id WHERE username='zoo' ORDER BY date DESC;
  knex
  .select('articles.id', 'articles.user_id', 'articles.title', 'articles.body', 'articles.date', 'users.username', 'users.email')
  .table('articles')
  .innerJoin('users', 'articles.user_id', 'users.id')
  .where({username: username})
  .orderBy('date', 'desc')
  .returning('*')
  .then((postings) => {

    console.log(postings);
    console.log(req.session.user);
    res.render('userpostingspublic', {
      postings: postings,
      user: req.session.user || "visitor",
      usernamepage: req.params.username
    });
  });

});



//GET UNIQUE ARTICLE FROM THIS USER
router.get('/:username/:id', function(req, res, next) {
  console.log(req.params);
  let username = req.params.username; //get the username from the url
  let id = req.params.id;
  knex('articles')
  .select('articles.id', 'articles.user_id', 'articles.title', 'articles.body', 'articles.date', 'users.username', 'users.email')
  .innerJoin('users', 'articles.user_id', 'users.id')
  .where({
    username: username,
    'articles.id': req.params.id
  })
  // .orderBy('date', 'desc')
  .returning('*')
  .then((postings) => {

    if (postings.length === 0) {
      res.render('error', {
        user: req.session.user || "visitor",
        message: "404 - Page not found",
      explanation: "The page you are looking for does not exist. You are either trying to search for a post that does not exist or a post that is registered under a different user.",
      status: 404
      })
    }
    else {
      console.log(postings);
      console.log(req.session.user);
      res.render('usersingleposting', {
        postings: postings,
        user: req.session.user || "visitor"
      });
    }

  });
});


//GET UNIQUE ARTICLE FROM THIS USER but for other users to see
router.get('/pages/:username/:id', function(req, res, next) {
  console.log(req.params);
  let username = req.params.username; //get the username from the url
  let id = req.params.id;
  knex('articles')
  .select('articles.id', 'articles.user_id', 'articles.title', 'articles.body', 'articles.date', 'users.username', 'users.email')
  .innerJoin('users', 'articles.user_id', 'users.id')
  .where({
    username: username,
    'articles.id': req.params.id
  })
  // .orderBy('date', 'desc')
  .returning('*')
  .then((postings) => {

    if (postings.length === 0) {
      res.render('error', {
        user: req.session.user || "visitor",
        message: "404 - Page not found",
      explanation: "The page you are looking for does not exist. You are either trying to search for a post that does not exist or a post that is registered under a different user.",
      status: 404
      })
    }
    else {
      console.log(postings);
      console.log(req.session.user);
      res.render('usersinglepostingpublic', {
        postings: postings,
        user: req.session.user || "visitor",
        usernamepage: req.params.username
      });
    }

  });
});



//POST NEW ARTICLE
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
        message: "Invalid entry. Both title and body of post must have content."
      })
    }
  });

});


//GET SPECIFIC ARTICLE FOR EDIT? EDIT EXISTING ARTICLE
router.get('/:username/:id/edit', function(req, res, next) {
  console.log(req.params);
  let username = req.params.username; //get the username from the url
  let id = req.params.id;
  knex('articles')
  .select('articles.id', 'articles.user_id', 'articles.title', 'articles.body', 'articles.date', 'users.username', 'users.email')
  .innerJoin('users', 'articles.user_id', 'users.id')
  .where({
    username: username,
    'articles.id': req.params.id
  })
  // .orderBy('date', 'desc')
  .returning('*')
  .then((postings) => {
    var posting = postings[0]
    //Posting does not exist
    if (postings.length === 0) {
      res.render('error', {
        user: req.session.user || "visitor",
        message: "404 - Page not found",
      explanation: "The page you are looking for does not exist. You are either trying to search for a post that does not exist or a post that is registered under a different user.",
      status: 404
      })
    }
    else if (username !== req.session.user) { //user tries to edit a posting that is not his
      res.render('error', {
        user: req.session.user || "visitor",
        message: "403 - Forbidden access",
      explanation: "Sorry, you cannot edit this post. You are logged in as a different user.",
      status: 403
      })
    }
    else {
      console.log("Information from database on GET - edit form");
      console.log(posting);
      console.log(req.session.user);
      res.render('editarticle', {
        title: posting.title,
        body: posting.body,
        user: req.session.user,
        date: posting.date,
        user_id: posting.user_id,
        id: posting.id
      });
    }

  });
});


router.put('/:username/:id', function(req, res, next) {
  console.log("req.body coming from the PUT of EDITED article");
  console.log(req.body);
  console.log("req.session.user coming from the post page");
  console.log(req.session.user);


  knex('users')
  .select()
  .where({username: req.body.username})
  .then((users) =>{
    let user = users[0];

    if (validEntry(req.body)) {
      let userPosting = {
        title: req.body.title,
        body: req.body.body,
        date: new Date(),
        user_id: user.id
      };
      knex('articles')
      .where({id: req.body.article_id})
      .update(userPosting, "id")
      .then(() => {
        res.redirect('/articles/' + req.body.username + '/' + req.body.article_id);
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


//DELETE THE POSTING
router.delete('/:username/:id', function(req, res, next) {
  console.log("req.body coming from the delete router");
  console.log(req.body);
  console.log("req.params coming from the delete router");
  console.log(req.params);
  console.log(req.session.user);
  if (req.params.username !== req.session.user) { //user tries to delete a posting that is not his
    res.render('error', {
      user: req.session.user || "visitor",
      message: "403 - Forbidden access",
    explanation: "Sorry, you cannot delete this post. You are logged in as a different user or you are not logged in at all.",
    status: 403
    })
  }
  else {
    knex('articles')
    .where('id', req.params.id)
    .del()
    .then(() => {
      res.redirect('/articles/' + req.params.username)
    });
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
