module.exports = (sequelize, Sequelize) => {
  const Service = sequelize.define('service', {
    title: {
      type: Sequelize.TEXT('tiny'),
    },
    description: {
      type: Sequelize.TEXT,
    },
    icon: {
      type: Sequelize.TEXT('tiny'),
    },
    offices: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.TEXT('tiny'),
    },
    text: {
      type: Sequelize.TEXT,
    },
  });

  return Service;
};
