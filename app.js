// REQUIRES DEPENDENCIES
const express = require('express');
const data = require('./data.json');
const app = express();

// MIDDLEWARE
app.set('view engine', 'pug');
app.use( '/static', express.static('public') );

// ROUTES
app.get( '/', (req, res) => {
  res.locals.projects = data.projects;
  res.render('index');
});
app.get( '/about', (req, res) => {
  res.render('about');
});
app.get( '/project/:id', (req, res) => {
  const index = req.params.id;
  res.render( 'project', { project: data.projects[index] } );
});

// ERROR HANDLING
app.use( (req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = "Whoops! The page you're looking for doesn't exist.";
  console.log(err.status, err.message);
  next(err);
});
app.use( (err, req, res, next) => {
  if (err.status !== 404) {
    err.status = 500;
    err.message = "Something has gone wrong, please try again!";
    console.log(err.status, err.message);
  }
});


// STARTS SERVER
app.listen(3000, () => {
  console.log('This app is currently running on port 3000');
});
