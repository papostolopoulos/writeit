var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

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

module.exports = router;
