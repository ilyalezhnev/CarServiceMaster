const express = require('express');
const router = express.Router();
const passport = require('passport');

const db = require('../../models/index');
const CorporateClients = db.corporateClients;
const Images = db.images;

// router.get("/test", (req, res) => res.json({ msg: "Todos works" }));

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  CorporateClients.findOne({ include: Images })
    .then((corporateClients) => {
      if (!corporateClients) {
        errors.nocorporateClients = 'Нет юр. лиц';
        return res.status(404).json(errors);
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
    },
    { where: { id: req.params.id } }
  )
    .then((corporateClient) => {
      return res.status(200).json(corporateClient);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
