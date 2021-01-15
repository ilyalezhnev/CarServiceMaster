module.exports = (sequelize, Sequelize) => {
  const PromoImage = sequelize.define('promoImage', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  });

  return PromoImage;
};
