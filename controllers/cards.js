const path = require('path');
const { getFile } = require('../helpers');

const cards = path.join(__dirname, '..', 'data', 'cards.json');
const getAllCards = (req, res) => {
  getFile(cards)
    .then((data) => res
      .status(200)
      .send(JSON.parse(data)))
    .catch((error) => res
      .status(500)
      .send({ message: `На сервере произошла ошибка ${error}` }));
};

module.exports = {
  getAllCards,
};
