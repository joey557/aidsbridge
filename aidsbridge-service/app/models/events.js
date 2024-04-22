import mongoose from 'mongoose';

const eventsSchema = new mongoose.Schema({
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
  creator: {
    type: String,
    required: true,
    trim: true
  },
  creatorId: {
    type: String,
    required: true,
    trim: true
  },
  people: [
    {
      peopleName: {
        type: String,
        required: true,
        trim: true
      },
      accounrtId: {
        type: String,
        required: true,
        trim: true
      }
    }
  ],
  createdDate: {
    type: Date,
    default: Date.now
  },
  eventsDate: {
    type: Date,
    default: Date.now
  }
});

//const Events = mongoose.model('Events', eventsSchema);

const DB = mongoose.connection.useDb("finaldb");
const Events = DB.model('Events', eventsSchema);

export default Events;