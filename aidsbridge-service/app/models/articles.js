import mongoose from 'mongoose';

//schema for articles
const articlesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  creater: {
    type: String,
    required: true,
    trim: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  imageId: {
    type: String,
    //required: true,
    trim: true
  }
});


//const Articles = mongoose.model('Articles', articlesSchema);

const DB = mongoose.connection.useDb("finaldb");
const Articles = DB.model('Articles', articlesSchema);

export default Articles;