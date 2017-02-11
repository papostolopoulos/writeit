var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

module.exports = router;

//THIS IS IN THE INDEX.JS CURRENTLY
// REDIRECT TO NEW POSTING PAGE
// router.get('/newarticle', (req, res, next) => {
//   console.log("req.session.user from the new posting redirect");
//   console.log(req.session.user);
//   if (req.session.user === undefined) {
//     res.render('error', {
//       user: "visitor",
//       message: "404 - Restricted page",
//     explanation: "Sorry but the page you are trying to access is restricted. You are either logged in as a different user or you are not logged in at all.",
//     status: 404
//     })
//     console.log('something is wrong');
//   }
//   res.render('newarticle', {
//     user: req.session.user
//   });
// });


// THIS IS IN THE ARTICLES PAGE
//POST ARTICLES AFTER THEY COME FROM THE NEW ARTICLE FORM
// router.post('/', (req, res, next) => {
//   console.log("req.body coming from the post of new article");
//   console.log(req.body);
//   console.log("req.session.user coming from the post page");
//   console.log(req.session.user);
//
//   knex('users')
//   .select()
//   .where({username: req.session.user})
//   .then((users) =>{
//     let user = users[0];
//     console.log(user.id);
//
//     if (validEntry(req.body)) {
//       let userPosting = {
//         title: req.body.title,
//         body: req.body.body,
//         date: new Date(),
//         user_id: user.id
//       };
//       knex('articles')
//       .insert(userPosting, "id")
//       .then(ids => {
//         let id = ids[0];
//         res.redirect('/articles/' + req.session.user);
//       });
//     }
//
//     else {
//       res.status(500);
//       res.render('error', {
//         message: "Invalid entry (coming from articles.js)"
//       })
//     }
//   });
//
//
// });

module.exports = router;
