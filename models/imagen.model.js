import mongoose from "mongoose";

const imagenSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Like'
    }
  ]
});

const Imagen = mongoose.model('Image', imagenSchema);

export default Imagen;