const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const db = require('./models');

const usersController = require('./controllers/user.controller');
require('./config/passport')(passport);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/api/users', users);

db.sequelize.sync();
db.sequelize
  .authenticate()
  .then(() => {
    console.log('DB connected.');
    usersController.adminSeeder();
  })
  .catch((err) => console.error('Connection error: ', err));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('main');
});

// app.get('/admin', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
