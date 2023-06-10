import mongoose from "mongoose";

const proyectoSchema = new mongoose.Schema({
  repo: {
    type: String,
    default: '/'
  },
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  src: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

const Project = mongoose.model('Project', proyectoSchema);

export default Project;