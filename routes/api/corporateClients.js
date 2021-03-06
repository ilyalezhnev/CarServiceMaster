const express = require('express');
const router = express.Router();
const passport = require('passport');

const db = require('../../models/index');
const CorporateClients = db.corporateClients;

const corporateClientsController = require('../../controllers/corporateClients.controller');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  corporateClientsController
    .getCorporateClients()
    .then((corporateClients) => {
      if (!corporateClients) {
        return res.status(200).json(null);
      }
      res.json(corporateClients);
    })
    .catch((err) => res.status(404).json(err));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  CorporateClients.findOne()
    .then((corporateClients) => {
      if (!corporateClients) {
        return CorporateClients.create({
          title: req.body.title,
          description: req.body.description,
          info: req.body.info,
        }).then((corporateClient) => corporateClient);
      }
      throw new Error('Whoops!');
    })
    .then((corporateClient) => res.status(201).json(corporateClient))
    .catch((err) => res.status(400).json(err));
});

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  CorporateClients.update(
    {
      title: req.body.title,
      description: req.body.description,
      info: req.body.info,
    },
    { where: { id: req.params.id } }
  )
    .then((corporateClient) => {
      return res.status(200).json(corporateClient);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
