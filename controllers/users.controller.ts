import express, { Router } from 'express';
import User from '../models/users.model.js';
import { NewUserType, UserType } from '../User.type.js';

const usersRouter: Router = express.Router();

usersRouter.get('/', async (_req, res) => {
  try {
    const users: UserType[] = await User.find();
    res.json(users);
  } catch (error) {
    console.log('Error fetching users', error);
    res.status(404).end();
  }
});

usersRouter.post('/', async (req, res) => {
  const { newUserData }: { newUserData: NewUserType } = req.body;
  try {
    const newUser = new User(newUserData);
    const createdUser: UserType = await newUser.save();
    res.json(createdUser);
  } catch (error) {
    console.log('Error while creating new user', error);
    res.status(500).json({ error: error });
  }
});

usersRouter.delete('/:id', async (req, res) => {
  const userId: string = req.params.id;
  try {
    await User.findByIdAndDelete(userId);
    res.status(204).end();
  } catch (error) {
    console.log('Error while trying to delete an user', error);
    res.status(500).json({ error: error });
  }
});

usersRouter.patch('/:id', async (req, res) => {
  const userId: string = req.params.id;
  console.log('userId', userId);
  const { updatedUserData }: { updatedUserData: NewUserType } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    console.log('Error while trying to update an user', error);
    res.status(500).json({ error: error });
  }
});

export default usersRouter;
