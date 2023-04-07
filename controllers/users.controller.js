import express from 'express';
import User from '../models/users.model.js';

const usersRouter = express.Router();

usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log('Error fetching users', error);
    res.status(404).end();
  }
});

usersRouter.post('/', async (req, res) => {
  const { newUserData } = req.body;
  try {
    const newUser = new User(newUserData);
    const createdUser = await newUser.save();
    res.json(createdUser);
  } catch (error) {
    console.log('Error while creating new user', error);
    //VIRHEEN LUKU JA OHJAUS
    res.status(500).json({ error: error });
  }
});

usersRouter.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findByIdAndDelete(userId);
    res.status(204).end();
  } catch (error) {
    console.log('Error while trying to delete an user', error);
    res.status(500).json({ error: error });
  }
});

usersRouter.patch('/:id', async (req, res) => {
  const userId = req.params.id;
  console.log('userId', userId);
  const { updatedUserData } = req.body;
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
