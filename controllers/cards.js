const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500)
      .send({ message: 'Ошибка сервера. Повторите попытку позже' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: err.message });
        return;
      }
      res
        .status(500)
        .send({ message: 'Ошибка сервера. Повторите попытку позже' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(404)
          .send({ message: err.message });
        return;
      }
      res
        .status(500)
        .send({ message: 'Ошибка сервера. Повторите попытку позже' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .orFail()
    .then((likes) => res.send({ data: likes }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(404)
          .send({ message: err.message });
        return;
      }
      res
        .status(500)
        .send({ message: 'Ошибка сервера. Повторите попытку позже' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .orFail()
    .then((likes) => res.send({ data: likes }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(404)
          .send({ message: err.message });
        return;
      }
      res
        .status(500)
        .send({ message: 'Ошибка сервера. Повторите попытку позже' });
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
