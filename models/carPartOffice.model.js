module.exports = (sequelize, Sequelize) => {
  const CarPartOffice = sequelize.define('carPartOffice', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.TEXT('tiny'),
    },
  });

  return CarPartOffice;
};
