const express = require('express');
const data = require('./data.json');
const app = express();

app.set('view engine', 'pug');
app.use( '/static', express.static('public') );

app.get( '/', (req, res) => {
  res.locals.projects = data.projects;
  res.render( 'index');
});
app.get( '/about', (req, res) => {
  res.render('about');
});
app.get( '/project/:id', (req, res) => {
  res.locals.projects = data.projects;
  const index = req.params.id;
  res.render( 'project', {project: data.projects[index]} );
});





app.listen(3000, () => {
  console.log('This app is currently running on port 3000');
});
