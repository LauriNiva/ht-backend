import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config.js';
import usersRouter from './controllers/users.controller.js';
import requestlogger from './utils/requestlogger.js';

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((error) => {
    console.log('error conneting to db: ', error.message);
  });

app.use(express.json());

app.use(requestlogger);
app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
