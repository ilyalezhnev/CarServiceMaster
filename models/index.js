const Sequelize = require('sequelize');

const sequelize = new Sequelize('masterdb', 'root', 'sql060982', {
  dialect: 'mysql',
  host: 'localhost',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Tables
db.users = require('./user.model.js')(sequelize, Sequelize);
db.mainPage = require('./mainPage.model.js')(sequelize, Sequelize);
db.offices = require('./office.model.js')(sequelize, Sequelize);
db.images = require('./images.model.js')(sequelize, Sequelize);
db.services = require('./service.model.js')(sequelize, Sequelize);
db.serviceImage = require('./serviceImage.model.js')(sequelize, Sequelize);
db.services.belongsToMany(db.images, { through: db.serviceImage });
db.serviceOffice = require('./serviceOffice.model')(sequelize, Sequelize);
db.services.belongsToMany(db.offices, { through: db.serviceOffice });
db.carParts = require('./carPart.model.js')(sequelize, Sequelize);
db.promos = require('./promo.model.js')(sequelize, Sequelize);
db.promoImage = require('./promoImage.model.js')(sequelize, Sequelize);
db.promos.belongsToMany(db.images, { through: db.promoImage });
db.corporateClients = require('./corporateClients.model.js')(sequelize, Sequelize);
db.corporateClientImage = require('./corporateClientImage.model.js')(sequelize, Sequelize);
db.corporateClients.belongsToMany(db.images, { through: db.corporateClientImage });
db.mainPage = require('./mainPage.model.js')(sequelize, Sequelize);
db.carPartOffice = require('./carPartOffice.model')(sequelize, Sequelize);
db.carParts.belongsToMany(db.offices, { through: db.carPartOffice });

module.exports = db;
