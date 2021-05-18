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
const officesController = require('./controllers/offices.controller');
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
app.use('/service/static', express.static(path.join(__dirname, 'static')));
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
  const services = await servicesController.getServices();
  const mappedServices = services.map((it) => ({
    id: it.id,
    title: it.title,
  }));

  res.render('service', { serviceItem, mappedServices });
});

app.get('/car-parts', async (req, res) => {
  const services = await servicesController.getServices();
  const mappedServices = services.map((it) => ({
    id: it.id,
    title: it.title,
  }));

  res.render('carParts', { mappedServices });
});

app.get('/corporate', async (req, res) => {
  const services = await servicesController.getServices();
  const mappedServices = services.map((it) => ({
    id: it.id,
    title: it.title,
  }));

  res.render('corporateClients', { mappedServices });
});

app.get('/contacts', async (req, res) => {
  const services = await servicesController.getServices();
  const mappedServices = services.map((it) => ({
    id: it.id,
    title: it.title,
  }));

  res.render('contacts', { mappedServices });
});

app.get('/discount', async (req, res) => {
  const services = await servicesController.getServices();
  const mappedServices = services.map((it) => ({
    id: it.id,
    title: it.title,
  }));

  res.render('discount', { mappedServices });
});

app.get('/admin', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'build', 'index.html'));
});

app.get('/', async (req, res) => {
  const { dataValues } = await mainPageController.getMainPage();
  const services = await servicesController.getServices();
  const offices = await officesController.getOffices();
  const mainPageContent = { ...dataValues, serviceDescription: marked(dataValues.serviceDescription) };

  const mappedServices = services.map((it) => {
    const { id, title, icon } = it;
    return {
      id,
      title,
      icon,
    };
  });

  const mappedOffices = offices.map((it) => {
    const { dataValues } = it;
    const { tel, address, fullTel } = dataValues;

    return {
      address,
      tel,
      fullTel,
    };
  });

  res.render('main', { mainPageContent, mappedServices, mappedOffices });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
