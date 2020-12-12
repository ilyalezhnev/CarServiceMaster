module.exports = (sequelize, Sequelize) => {
  const Promo = sequelize.define('promo', {
    title: {
      type: Sequelize.TEXT('tiny'),
    },
    imageCarousel: {
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
  });

  return Promo;
};
