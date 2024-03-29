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

const mainPageController = require('./controllers/mainPage.controller');
const servicesController = require('./controllers/services.controller');
const reviewsController = require('./controllers/reviews.controller');
const dataMapper = require('./mappers/data.mapper');
const marked = require('marked');

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
app.use('/favicon.ico', express.static('static/img/favicon.ico'));
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

app.get('/service/:id', async (req, res, next) => {
  const serviceItem = await servicesController.getService(req.params.id);
  serviceItem.description = marked(serviceItem.description);
  const mappedOffices = await dataMapper.getMappedOffices();
  const mappedServices = await dataMapper.getMappedServices();

  res.render('service', { serviceItem, mappedServices, mappedOffices });
});

app.get('/car-parts', async (req, res) => {
  const mappedOffices = await dataMapper.getMappedOffices();
  const mappedServices = await dataMapper.getMappedServices();
  const mappedCarParts = await dataMapper.getMappedCarParts();

  res.render('carParts', { mappedServices, mappedOffices, mappedCarParts });
});

app.get('/corporate', async (req, res) => {
  const mappedOffices = await dataMapper.getMappedOffices();
  const mappedServices = await dataMapper.getMappedServices();
  const corporateClients = await dataMapper.getCorporateClients();

  res.render('corporateClients', { mappedServices, mappedOffices, corporateClients });
});

app.get('/contacts', async (req, res) => {
  const mappedOffices = await dataMapper.getMappedOffices();
  const mappedServices = await dataMapper.getMappedServices();

  res.render('contacts', { mappedServices, mappedOffices });
});

app.get('/discount', async (req, res) => {
  const mappedOffices = await dataMapper.getMappedOffices();
  const mappedServices = await dataMapper.getMappedServices();
  const mappedPromos = await dataMapper.getMappedPromos();

  res.render('discount', { mappedServices, mappedOffices, mappedPromos });
});

app.get('/admin', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'build', 'index.html'));
});

app.get('/', async (req, res) => {
  const { dataValues } = await mainPageController.getMainPage();
  const mainPageContent = { ...dataValues, serviceDescription: marked(dataValues.serviceDescription) };
  const mappedOffices = await dataMapper.getMappedOffices();
  const mappedServices = await dataMapper.getMappedServices();
  const mappedPromos = await dataMapper.getMappedPromos();
  const reviews = (await reviewsController.getReviews()) || [];

  res.render('main', { mainPageContent, mappedServices, mappedOffices, mappedPromos, reviews });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
