const express = require('express');
const path = require('path');
const { useRouter } = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users/', useRouter);

app.listen(PORT, () => {
  console.log(`APP listening on port ${PORT}`);
});
