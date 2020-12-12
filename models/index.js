const Sequelize = require('sequelize');

const sequelize = new Sequelize('masterdb', 'root', null, {
  dialect: 'mysql',
  host: 'localhost',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Tables
db.users = require('./user.model.js')(sequelize, Sequelize);
db.offices = require('./office.model.js')(sequelize, Sequelize);
db.service = require('./service.model.js')(sequelize, Sequelize);
db.serviceIcons = require('./serviceIcon.model.js')(sequelize, Sequelize);
db.carParts = require('./carParts.model.js')(sequelize, Sequelize);
db.promos = require('./promo.model.js')(sequelize, Sequelize);
db.corporateClients = require('./corporateClients.model.js')(sequelize, Sequelize);
db.mainPage = require('./mainPage.model.js')(sequelize, Sequelize);

module.exports = db;
