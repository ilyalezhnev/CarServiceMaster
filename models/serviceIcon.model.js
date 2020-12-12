module.exports = (sequelize, Sequelize) => {
  const ServiceIcon = sequelize.define('serviceIcon', {
    url: {
      type: Sequelize.TEXT('tiny'),
    },
    name: {
      type: Sequelize.TEXT('tiny'),
    },
  });

  return ServiceIcon;
};
