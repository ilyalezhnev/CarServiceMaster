module.exports = (sequelize, Sequelize) => {
  const Promo = sequelize.define('promo', {
    titleForMain: {
      type: Sequelize.TEXT('tiny'),
    },
    title: {
      type: Sequelize.TEXT('tiny'),
    },
    description: {
      type: Sequelize.TEXT,
    },
    shortDescription: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.TEXT('tiny'),
    },
    sliderImage: {
      type: Sequelize.TEXT('tiny'),
    },
  });

  return Promo;
};
