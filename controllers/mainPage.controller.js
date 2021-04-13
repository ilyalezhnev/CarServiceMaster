const db = require('../models/index');
const MainPage = db.mainPage;

exports.getMainPage = () => {
  return MainPage.findOne();
};
