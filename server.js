const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT || 3000;
const DB = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then((con) => console.log('DATABASE CONNECTED SUCCESSFULLY....'))
  .catch((err) => console.log('OOOOOOOPS DATABASE NOT CONNECTED', err));

app.listen(port, () => {
  console.log(`APP IS LISTENING TO PORT: ${process.env.PORT}`);
});
