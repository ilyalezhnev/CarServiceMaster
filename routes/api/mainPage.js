const express = require('express');
const router = express.Router();
const passport = require('passport');

const db = require('../../models/index');
const MainPage = db.mainPage;

const mainPageController = require('../../controllers/mainPage.controller');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  mainPageController
    .getMainPage()
    .then((mainPage) => {
      if (!mainPage) {
        return res.status(200).json(null);
      }
      res.json(mainPage);
    })
    .catch((err) => res.status(404).json(err));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  MainPage.findOne()
    .then((mainPage) => {
      if (!mainPage) {
        return MainPage.create({
          title: req.body.title,
          subtitle: req.body.subtitle,
          serviceDescription: req.body.serviceDescription,
        }).then((mainPage) => mainPage);
      }
      throw new Error('Whoops!');
    })
    .then((mainPage) => res.status(201).json(mainPage))
    .catch((err) => res.status(400).json(err));
});

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  MainPage.update(
    {
      title: req.body.title,
      subtitle: req.body.subtitle,
      serviceDescription: req.body.serviceDescription,
    },
    { where: { id: req.params.id } }
  )
    .then((mainPage) => {
      return res.status(200).json(mainPage);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
