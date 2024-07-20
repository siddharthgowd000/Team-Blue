const express = require('express')
const router = express.Router()
const Users =  require('../models/users')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
router.post('/signup', async (req, res) => {
    const { username, email, fullname, password } = req.body;
    console.log("t");
    console.log(username)
    try {
      const existingUser = await Users.findOne({ where: { username:username } });
      console.log('t');
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists.' });
      }
      console.log("tt");
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("ok");
      const newUser = await Users.create({
        username,
        email,
        fullname,
        password: hashedPassword
      });
      console.log("okkkk");
  
      res.status(201).json({ message: 'User created successfully!', userId: newUser.id });
      console.log("User created successfully!")
    } catch (error) {
      res.status(500).json({ message: 'Error creating user.', error });
      console.log("Error creating user")
    }
  });
  

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      
      const user = await Users.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
      console.log("okkk");
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
  
      const token = jwt.sign({ id: user.id, username: user.username ,fullname:user.fullname}, process.env.secretkey, { expiresIn: '7d' });
  
      res.json({ message: 'Login successful!', token:token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in.', error });
    }
  });
  
module.exports=router