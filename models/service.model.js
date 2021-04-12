module.exports = (sequelize, Sequelize) => {
  const Service = sequelize.define('service', {
    title: {
      type: Sequelize.TEXT('tiny'),
    },
    cost: {
      type: Sequelize.TEXT('tiny'),
    },
    description: {
      type: Sequelize.TEXT,
    },
    text: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.TEXT('tiny'),
    },
    icon: {
      type: Sequelize.TEXT('tiny'),
    },
  });

  return Service;
};
