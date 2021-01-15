module.exports = (sequelize, Sequelize) => {
  const CorporateClientImage = sequelize.define('corporateClientImage', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  });

  return CorporateClientImage;
};
