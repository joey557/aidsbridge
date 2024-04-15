import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  accountId: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
});

const Users = mongoose.model('Users', usersSchema);

export default Users;