## Checklist
* [ ] Generate an Express App
* [ ] Create database/table
* [ ] Seed table with sample data
* [ ] List all records with GET/todo
* [ ] Add bootstrapShow new form with /todo/new
* [ ] Create a record with Post/todo
* [ ] Show one record with GET/todo/:id
* [ ] Show an edit form with GET /todo/:id/edit
* [ ] Update a record with PUT/todo/:id
* [ ] Delete a record with Delete/todo/:id
* [ ] Redirect on create/update/delete

## What is used
* postgres for the database
* knex for the database migration, seeds and queries
* express.js for routes and rendering
* handlebars.js for server side view templates
* bootstrap for the ui

## Checklist
* [X] Generate an Express App
  * express --git --hds (create git ignore file and use handlebars as the views vehicle)
  * install dependencies (npm install)
  * npm start for the server (or nodemon)

* [X] Create database and table (knex init)
  * createdb (name of db)
  * add knex and pg which is the database driver (npm)
  * knex init (initialize knex)
  * remove all the extra things and keep the development key value pairs (later we add production)
  * knex migrate make:todo (make knex.js) make a migration for the todo table
  * go to the knex file and get rid of what is not needed
  * go to the migrations file and create the tables
  * knex migrate:latest

* [X] Seed table with sample data
  * knex seed:make todo (creates the seeds folder)
  * In the todo table modify the table to have the dummy data
  (dude did it with an array and then a .insert())
  * knex seed:run

* [X] List all records with GET/todo
  * go to app.js to create a route. app.js is the beginning of the express app. He did nothing on this step, he just explained.
  * Duplicate the index.js file in the routes folder and change the title in res.render. Name the file "todo.js"
  * define a new variable named "todo" in the app.js file for the "require"
  * do a new app.use for ('/todo', todo)
  This means that the url extension /todo runs the file todo.js
  * go to the browser and type "localhost:3000/todo" to confirm
  all is working
  * create a db folder and create a knex.js file. This file will help us connect to the database so we can get some data out of it. See the knex.js file to understand what has been happening
  * update the knexfile.js to have the key value pairs for production within the module exports.
  * in the knex.js file we set the "config" variable and the module.exports. This config variable equals to the object in the knexfile.js. The knexfile.js is pointing to the database that is used for this project.
  * In the module.exports we say require and we are bringing the knex library and we are invoking with the configuration. (module.exports = require('knex')(config)). Consequently, the knex.js file exports this configuration.
  * In the todo.js file we are defining the "knex" variable which requires the db/knex file. This is the active connection to the database.
  * get all the rows from the file from the router.get settings in the todo.js file. In the tutorial, because the dude did a res.render('all'), there was an error when looking on the browser. That is because the file "all" was not set up in the views directory
  * in the views directory set up a file called all.hbs.
  https://www.youtube.com/watch?v=WYa47JkZH_U

* [X] Add bootstrap
  * go to bootstrap / getting started. copy the <link> tag and paste it at layout.hbs. The layout is the container for all the views that are handled in handlebars.
  * In the layout.hbs, he pasted the bootstrap link along with the existing css link.
  * Gave to body the "container" class
  * went to components to get a list-group ul. Then pasted it in the all.hbs page. He is rendering the {{title}} inside the <li> tags
  * he added margin-top in the body tag from the style.css file.

23:40
* [X] Show new form with /todo/new
  * Went to the todo.js file to create a new route for the form
  * Created a new.hbs file in the "views" folder
  * Created a form in the new.hbs with a single input. He gave classes in the div tag and an id to the form. He probably knew what to expect from prior work with bootstrap.
  * he went to the "all.hbs" page and created a button which he then converted in an anchor. This button is used for redirecting to the "/todo/new" page
  * Went to bootstrap to check on the colors for the buttons (in css page) and chose btn-primary class for the button.
  * Created a text area tag for the description. Included in a div tag and with a label, same pattern like before with the appropriate ids and classes.
  * Created a priority dropdown, same pattern
  * Created a button with "type = 'submit'".


* [X] Create a record with Post/todo
  * Created a router.post in todo.js for "/"
  * Created function validTodo in order to confirm that some conditions are met in order to accept that the object data is valid
  * Created a "todo" object in the router.post which collects all the req.body arguments
  * Pushed all the data through knex - insert - then
  * updated the "else" statement to provide a 500 error
  * we needed to update the forms. All inputs should have a name. Also the priority field returns as a string but it should be a number.
  * we needed to update the todo variable in order to have a date entry
  * we needed to update the confirmation function in order to confirm that the priority is a number

* [X] Show one record with GET/todo/:id
  * created a router.get in todo.js for "/todo/:id"
  * added "where" and "first" in the knex command (first is for LIMIT 1)
  * Linked all the different titles of the todos to their individual page. For that,
  * went to bootstrap. Components - list group - linked items. Created anchor tags based on bootstrap instructions
  * In all.hbs changed <li> to <a>
  * created a "single.hbs" file in the views directory
  * In bootstrap he selected a "Panel with heading"
  * selected the second paragraph. put {{title}} for heading and {{description}} for body
  * went back to bootstrap to select the footer. He put the {{date}}
  * He went to the badges, selected a span and put the {{priority}} inside along the {{title}}
  * initially it was not rendering in the page. It was set like an object with a property todo and a value todo.
  * what I did is set key - value pairs in the todo.js file like {description: todo.description}.
  What he did is res.render("single", todo) because the object "todo" already has these properties. So when the view in the .hbs file renders, it has access to these properties.

* [X] Show an edit form with GET /todo/:id/edit
  * Created a router.get("/:id/edit" for the edit view
  * went to single.hbs and created an edit button. Changed to an anchor tag and used the default and added class "btn-warning"
  * ATTENTION: It was not working for me because I had not added id: id as a key value pair in the router.get('todo/:id')
  * create an edit.hbs by duplicating the "new.hbs" page. Instead of post request it has to be a put request.
  * put a "value" attribute in all the form elements where they were matched with the related existing values (in handlebars format)
  * changed one of the button's classes from btn-success to btn-danger.
  * used knex to update the router.get(":id/edit") in order to retrieve the related values that had been input already.
  * he decided that he would take the piece of code he wrote before and create a function instead that he would run. Function is "respondAndRenderTodo"
  * added an extra parameter in the function "respondAndRenderTodo" called "viewName", used for the res.render of different renders
  * Moved the "/new" on top of the other router.get options because I was getting an error.
  * looked up how he can add a handlebars helper in order for the entries to be pre-populated in the "edit" form
  * for me it worked on the priority option dropdown, but did not work in the description text area. He did not modify the text area at all. There was a mention how this could be manipulated by building javascript but this is not what we want for this project.

* [X] Update a record with PUT/todo/:id
  * He took all the information from "post" to create a new function that can be used for both post and put. Function name is validateTodoInsertUpdateRedirect
  * for this function he added a callback where he does the knex manipulation.
  * modified the knex in the put so there is a WHERE condition
  * modified the res.redirect with req.params.id
  * changed the action in the edit form to be /todo/{{id}} and the method as "PUT"
  * even though the method was "PUT", it did a GET request. He confirmed by looking at the terminal. He is going to do a method override.
  * Looked for "Express method override". A form can only GET or POST. It cannot PUT or DELETE. He installed "method-override"
  * He put the "require" in app.js and added and extra line of app.use. Reference for method override is here: https://www.npmjs.com/package/method-override
  * updated the "action" attribute in the edit.hbs form - action="/todo/{{id}}?_method=PUT" __
* [X] Delete a record with Delete/todo/:id
  * copied the inside of the respondAndRenderTodo function
  * added .del() for deleting the entry
  * changed the render to res.redirect('/todo')
  * We need to make a delete request. He created a form so he can submit the delete request. That is in the single.hbs file
  * added a button in the form
  * he put both anchor and button in the form because the form is a block level element so it can render properly
* [X] Redirect on create/update/delete

* [X] Fix the form for logging in (at index.js)
* [X] Redirect to account exists page if the username already exists in the database
* [X] Encrypt the password information for sign up (at index.js)
* [X] Encrypt the password information for login (at index.js)
* [] Require the password to have a specific length or set of characters (at index.js)
* [] Validate sign up info (at index.js see function named validateSignupInfo)
* [X] Fix the height for the login area (at index.js)
* [X] Display main information at header bar (at layout.js)
* [X] Fix the form for submitting a new article
* [X] Put the login info outside the header
* [X] Replace the icon in the header bar
* [X] Enable cookies
* [X] Enable logouts
* [X] Create filter for viewing user specific postings
* [X] Need to connect the session with the posting coming from the user
* [X] Need to render the page of the user's postings
* [X] Need to not give access to the user for all pages but only his pages
* [X] Need to display articles in reverse order of them being posted
* [X] Set up cookies for new user sign up
* [X] Give the option to the user to delete
* [X] Give the option to the user to edit posts
* [X] Change the settings link so that it can give a 404 when the visitor tries to access it
* [] put title attributes inside the header links
* [] set up the link for the viewIt button
* [] In the articles.js file update the router.get('/username/id') to redirect to an individual article page (need to create that)

* [] Look for a library that can help me use an html editor





[X] Cannot hash password in a synchronous way
[X] Cannot render postings in the user's page
[X] Need to connect the cookie to all the pages the user browses
[X] Problem with the new posting does not go in database
[X] cannot redirect to the unique user or unique articles page of the user from the nav bar
[X] posting not saved in database even though it renders in front page
[] Cannot redirect a route from newPosts. app.js does not connect to page - route is set, app.use is set
