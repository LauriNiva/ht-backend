import { Schema, model } from 'mongoose';
import { UserType } from '../types/User.type';

const userSchema = new Schema<UserType>({
  name: {
    type: String,
    required: true,
    minlenght: 4,
  },
  username: {
    type: String,
    required: true,
    minlenght: 4,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlenght: 4,
  },
  website: {
    type: String,
    required: true,
    minlenght: 4,
  },
  phone: {
    type: String,
    required: true,
    minlenght: 6,
  },
  address: {
    street: { type: String, required: true },
    suite: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
    geo: {
      lat: { type: String, required: true },
      lng: { type: String, required: true },
    },
  },
  company: {
    name: { type: String, required: true },
    catchPhrase: { type: String, required: true },
    bs: { type: String, required: true },
  },
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model('User', userSchema);
