const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res
      .send({ data: users }))
    .catch(() => res
      .status(500)
      .send({ message: 'Ошибка сервера. Повторите попытку позже' }));
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: err.message });
        return;
      } res
        .status(500)
        .send({ message: 'Ошибка сервера. Повторите попытку позже' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: err.message });
        return;
      } res
        .status(500)
        .send({ message: 'Ошибка сервера. Повторите попытку позже' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findOneAndUpdate({ _id: req.user._id }, { name, about },
    {
      new: true,
      runValidators: true,
    })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res.status(400).send({ message: err.message });
        return;
      } res
        .status(500)
        .send({ message: 'Ошибка сервера. Повторите попытку позже' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findOneAndUpdate({ _id: req.user._id }, { avatar },
    {
      new: true,
      runValidators: true,
    })
    .orFail()
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res.status(400).send({ message: err.message });
        return;
      } res
        .status(500)
        .send({ message: 'Ошибка сервера. Повторите попытку позже' });
    });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
