import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  },
  ipAddress: {
    type: String,
    required: true
  }
});

const Like = mongoose.model('Like', likeSchema);

export default Like;