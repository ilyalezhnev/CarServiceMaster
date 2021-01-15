module.exports = (sequelize, Sequelize) => {
  const Service = sequelize.define('service', {
    title: {
      type: Sequelize.TEXT('tiny'),
    },
    description: {
      type: Sequelize.TEXT,
    },
    text: {
      type: Sequelize.TEXT,
    },
  });

  return Service;
};
