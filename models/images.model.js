module.exports = (sequelize, Sequelize) => {
  const Images = sequelize.define('images', {
    filename: {
      type: Sequelize.TEXT('tiny'),
    },
    extension: {
      type: Sequelize.TEXT('tiny'),
    },
    url: {
      type: Sequelize.TEXT,
    },
  });

  return Images;
};
