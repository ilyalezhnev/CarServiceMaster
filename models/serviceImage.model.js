module.exports = (sequelize, Sequelize) => {
  const ServiceImage = sequelize.define('serviceImage', {
    type: {
      type: Sequelize.TEXT('tiny'),
    },
  });

  return ServiceImage;
};
