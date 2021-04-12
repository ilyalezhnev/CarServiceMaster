module.exports = (sequelize, Sequelize) => {
  const Review = sequelize.define('review', {
    fullName: {
      type: Sequelize.TEXT('tiny'),
    },
    text: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.TEXT('tiny'),
    },
  });

  return Review;
};
