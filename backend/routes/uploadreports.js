const express = require('express')
const router = express.Router()
const Users =require('../models/users')
const Images =require('../models/images')
const createMulterUpload = require('../middleware/uploadimages')
const processimages = require('../middleware/processimages')
const verify = require('../middleware/authentication')
const uploadimages = createMulterUpload()
const axios = require('axios')
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
router.post('/upload',uploadimages, processimages, async (req, res) => {
    try {
      const userId = 1

      const disease=req.body.disease
      console.log(disease);

      const response = await axios.post(`http://localhost:5000/${disease}`, {
        media: req.mediaData[0].base64String,
      });
      console.log(response.data.prediction);
      const createdImages = await Images.create({
        userid:userId,
        media: req.mediaData.map(image =>image.base64String),
        disease:disease +"cancer", 
        prediction:response.data.prediction,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      return res.status(201).json({ prediction:response.data.prediction });
    } catch (error) {
      console.error('Error uploading images:', error);
      res.status(500).json({ message: 'Error uploading images', error });
    }
  });
router.get('/history',async(req,res)=>{
  const userId =1
  try{
  const dashboard =await Images.findAll({where:{
    userid:userId
  }})
  return res.status(201).send(dashboard)
}catch{
  return res.status(500).send({message:"error fetching dashboard"})
}
})


module.exports=router