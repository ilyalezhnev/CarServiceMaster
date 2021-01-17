module.exports = (sequelize, Sequelize) => {
  const CarPart = sequelize.define('carPart', {
    title: {
      type: Sequelize.TEXT('tiny'),
    },
    subtitle: {
      type: Sequelize.TEXT,
    },
  });

  return CarPart;
};
