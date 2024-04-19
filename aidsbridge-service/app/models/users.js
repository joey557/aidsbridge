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

const DB = mongoose.connection.useDb("finaldb");
const Users = DB.model('users', usersSchema);

export default Users;