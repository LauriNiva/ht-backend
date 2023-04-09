import express, { Router } from 'express';
import User from '../models/users.model.js';
import { NewUserType, UserType } from '../types/User.type.js';

const usersRouter: Router = express.Router();

usersRouter.get('/', async (_req, res) => {
  const users: UserType[] = await User.find();
  res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const { newUserData }: { newUserData: NewUserType } = req.body;
  const newUser = new User(newUserData);
  const createdUser: UserType = await newUser.save();
  res.json(createdUser);
});

usersRouter.delete('/:id', async (req, res) => {
  const userId: string = req.params.id;
  await User.findByIdAndDelete(userId);
  res.status(204).end();
});

usersRouter.patch('/:id', async (req, res) => {
  const userId: string = req.params.id;
  const { updatedUserData }: { updatedUserData: NewUserType } = req.body;
  const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
    new: true,
  });
  res.json(updatedUser);
});

export default usersRouter;
