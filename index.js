import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Project from './models/proyecto.model.js';
import Image from './models/imagen.model.js';
import Like from './models/like.model.js';
import axios from 'axios';

const app = express();

try{
  await mongoose.connect('mongodb://localhost/mipagina', 
  { useNewUrlParser: true});
}
catch (error){
  console.log("error: ", error);
}


app.use(cors());
app.use(express.json())

app.get('/projects', async function(req,res){
  const projects = await Project.find({});
  res.json(projects);
})
app.get('/projects/:id', async function(req,res){
  const id = req.params.id;
  const project = await Project.findOne({_id: id});
  res.json(project);
})

app.get('/images', async function(req,res){
  const images = await Image.find({});
  res.json(images);
})
app.get('/images/:id', async function(req,res){
  const id = req.params.id;
  const image = await Image.findOne({_id: id});
  console.log('likes: ',image.likes.length)
  res.json(image.likes.length);
})

app.get('/images/:id/like', async function(req,res){
  const id = req.params.id;
  const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const existingLike = await Like.findOne({image: id, ipAddress})
  if(existingLike){
    res.status(200).json(true);
  }else{
    res.status(200).json(false);
  }
});


app.post('/images/:id/like', async function(req,res){
  const id = req.body.id;
  const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  try {
    const existingLike = await Like.findOne({image: id, ipAddress})
    if(existingLike){
      await Like.deleteOne({_id:existingLike._id, ipAddress});
      console.log(existingLike._id);
      await Image.findOneAndUpdate({_id: id}, {$pull: {likes: existingLike._id}})
      return res.status(200).json({ message: 'Like eliminado correctamente.' });
    }else{
      const newLike = new Like({image: id, ipAddress});
      await newLike.save();
      await Image.findByIdAndUpdate(id, {$push: {likes: newLike}});
      return res.status(200).json({ message: 'Like agregado correctamente.' });  
    }
  } catch(error){
    console.log(error);
  }
});


const port = 3001 || process.env.PORT;
app.listen(port, function(){
  console.log('running on port: ',port);
})