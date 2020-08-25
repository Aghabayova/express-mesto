const path = require('path');
const readFile = require('../helpers/index');

const users = path.join(__dirname, '..', 'data', 'users.json');
const getAllusers = (req, res) => {
  readFile(users)
    .then((data) => res
      .status(200)
      .send(JSON.parse(data)))
    .catch((error) => res
      .status(500)
      .send({ message: `На сервере произошла ошибка ${error}` }));
};

const getUser = (req, res) => {
  readFile(users)
    .then((data) => {
      const currentUser = JSON.parse((data))
        .find((user) => user._id === req.params.id);
      if (!currentUser) {
        res
          .status(404)
          .send({ message: 'Такого пользователя нет' });
      }
      res
        .status(200)
        .send(currentUser);
    })
    .catch((error) => res
      .status(500)
      .send({ message: `На сервере произошла ошибка ${error}` }));
};

module.exports = {
  getAllusers,
  getUser,
};
