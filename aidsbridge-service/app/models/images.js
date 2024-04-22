import mongoose from 'mongoose';

const imgSchema = new mongoose.Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  name: String,
  img: {
    data: Buffer,
    contentType: String
    // contentType: "image/png"
  }
});

const DB = mongoose.connection.useDb("finaldb");
const Images = DB.model('Images', imgSchema);

export default Images;