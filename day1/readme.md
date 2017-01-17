## Day 1 - The Blog

We are going build a basic blog engine.

# Objectives
* Review RESTful routing with express.
* Review of migrations using knex.
* Review of seeds using knex.
* Review testing to RESTful routes using supertest.

The first thing we are going to need to do is setup an express app. Feel free to use the express generator to do this and get things up and running.  

`
express --hbs --git
`

## RESTful routing with express.

For this project, we are going to need to setup the following API routes for our blog engine;

`
/login - POST
/logout - GET
/account - POST
/articles  // GET - should list the most recent blog post.
/articles/{article_id}  // GET - retrieve blog post with it's id.
/articles/{article_id}/comment POST - post a comment to a blog post.
/articles/{article_id}/comments GET - retrieve all comments on a blog post.
`

So let's look at how to setup some of these routes using express. In your `routes` directory that was created by the express generator, create a `articles.js` file. You should already have a `users.js` file that we can use to setup the routes for `/login`, `/logout`, and `/account`.


## Knex migrations

We're going to need a database to make all this work. So let's go setup knex with our project and get our database setup in postgres.

So let's setup our knex for the project. You should already have knex installed globally.

In our project root, initialize knex.

`knex init`

Setup your database in postgres and updated your knexfile.js to reflect your db settings.

We're going to want to do knex migrations for the following tables:

#### users

| field     | datatype    |
| :------------- | :------------- |
| id | int       |
| username | string |
| email | string |
| password | string |

#### articles
| field | datatype    |
| :------------- | :------------- |
| id       | int       |
| user_id | int (fk) - users |
| title | string |
| body | string |

The articles table is also going to need to track when articles are updated and created.

#### comments
| field | datatype    |
| :------------- | :------------- |
| id       | int       |
| user_id | int (fk) - users |
| article_id | int (fk) - articles |
| comment | string |

Comments also need to track when they are created.

You're going to need a few commands to get that done:

`knex migrate:make {tablename}` to create a migration.

`knex migrate:latest` to run your migration.

`knex migrate:rollback` to rollback to a previous migration.


## Seeding the database with knex.

For testing purposes, let's create some seed data for our blog. You might need this command to get your seeds created:

`knex seed:make {tablename} --env development`

Once you create your seed data for all your tables, you can run your seeds using this command:

`knex seed:run --env development`

Once all your seed data is populated, we can continue setting up our routes and setup tests with supertest.

## Testing our RESTful routes using supertest.

To get testing to work, you're going to need supertest installed into your project:

`npm install supertest`

Go ahead and create a `tests` directory for our tests.

`mkdir tests`

Let's create our first test file in here to test out our default route `/`.

`touch default.js`

In that file, we're going to write a basic test for this. It should look something like this:

```js

var request = require('supertest');

// Here we get hold of the express application
// by using the exported 'app'-property
var app = require("./app");

describe('GET /', function(){
  it('respond with an index page', function(done){
    // the request-object is the supertest top level api
    request(app)
      .get('/')
      .set('Accept', 'text/html')
      .expect(200, done); // note that we're passing the done as parameter to the expect
  });
});
```

Now we should go ahead and create more tests for the other routes we will be setting up as we go. Remember, the idea is to have your test drive your development, so create your tests before your write the corresponding code.
