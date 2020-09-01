const express = require('express');
const {
  getAllCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,

} = require('../controllers/cards');

const router = express.Router();

router.get('/', getAllCards);
router.post('/', createCard);
router.put('/:_id/likes', likeCard);
router.delete('/:_id/likes', dislikeCard);
router.delete('/:_id', deleteCard);

module.exports = router;
