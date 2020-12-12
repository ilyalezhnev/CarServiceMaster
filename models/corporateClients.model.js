module.exports = (sequelize, Sequelize) => {
  const CorporateClient = sequelize.define('corporateClient', {
    title: {
      type: Sequelize.TEXT('tiny'),
    },
    description: {
      type: Sequelize.TEXT,
    },
    images: {
      type: Sequelize.TEXT,
    },
  });

  return CorporateClient;
};
