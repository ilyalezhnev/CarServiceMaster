module.exports = (sequelize, Sequelize) => {
  const MainPage = sequelize.define('mainPage', {
    title: {
      type: Sequelize.TEXT('tiny'),
    },
    subtitle: {
      type: Sequelize.TEXT,
    },
    serviceDescription: {
      type: Sequelize.TEXT,
    },
    generalDescription: {
      type: Sequelize.TEXT,
    },
  });

  return MainPage;
};
