import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config.js';
import usersRouter from './controllers/users.controller.js';
import requestlogger from './utils/requestlogger.js';

const app = express();

if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('connected to mongodb');
    })
    .catch((error) => {
      console.log('error conneting to db: ', error.message);
    });
} else {
  console.log('Set MONGODB_URI');
}

app.use(cors());
app.use(express.json());

app.use(requestlogger);

app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
