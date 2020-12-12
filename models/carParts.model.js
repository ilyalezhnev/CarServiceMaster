module.exports = (sequelize, Sequelize) => {
  const CarPart = sequelize.define('carPart', {
    title: {
      type: Sequelize.TEXT('tiny'),
    },
    subtitle: {
      type: Sequelize.TEXT,
    },
    descriptionOffice1: {
      type: Sequelize.TEXT,
    },
    imageOffice1: {
      type: Sequelize.TEXT('tiny'),
    },
    descriptionOffice2: {
      type: Sequelize.TEXT,
    },
    imageOffice2: {
      type: Sequelize.TEXT('tiny'),
    },
  });

  return CarPart;
};
