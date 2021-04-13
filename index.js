const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const auth = require('./routes/api/auth');
const uploads = require('./routes/api/uploads');
const mainPage = require('./routes/api/mainPage');
const services = require('./routes/api/services');
const servicesOffices = require('./routes/api/servicesOffices');
const carParts = require('./routes/api/carParts');
const offices = require('./routes/api/offices');
const carPartsOffices = require('./routes/api/carPartsOffices');
const corporateClients = require('./routes/api/corporateClients');
const corporateClientsImages = require('./routes/api/corporateClientsImages');
const promos = require('./routes/api/promos');
const images = require('./routes/api/images');
const reviews = require('./routes/api/reviews');
const db = require('./models');
const usersController = require('./controllers/user.controller');
require('./config/passport')(passport);

db.sequelize.sync();
db.sequelize
  .authenticate()
  .then(() => {
    console.log('DB connected.');
    usersController.adminSeeder();
  })
  .catch((err) => console.error('DB connection error: ', err));

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/api/auth', auth);
app.use('/api/admin/uploads', uploads);
app.use('/api/admin/mainpage', mainPage);
app.use('/api/admin/services', services);
app.use('/api/admin/servicesoffices', servicesOffices);
app.use('/api/admin/carparts', carParts);
app.use('/api/admin/offices', offices);
app.use('/api/admin/carpartsoffices', carPartsOffices);
app.use('/api/admin/corporateclients', corporateClients);
app.use('/api/admin/corporateclientsimages', corporateClientsImages);
app.use('/api/admin/promos', promos);
app.use('/api/admin/images', images);
app.use('/api/admin/reviews', reviews);

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('main');
});

app.get('/service', (req, res) => {
  res.render('service');
});

app.get('/car-parts', (req, res) => {
  res.render('carParts');
});

app.get('/corporate', (req, res) => {
  res.render('corporateClients');
});

app.get('/contacts', (req, res) => {
  res.render('contacts');
});

app.get('/discount', (req, res) => {
  res.render('discount');
});

app.get('/admin', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'build', 'index.html'));
});

app.get('/*', (req, res) => {
  res.render('main');
});
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
