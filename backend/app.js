const express=require('express')
const app=express()
const cors =require('cors')
const Images = require("./models/images");
const Users=require('./models/users')
const verify=require('./middleware/authentication')
const {sequelize}=require('./database/dbconfig');
const bodyParser = require('body-parser');
const authRoutes=require('./routes/authroutes')
const uploadRoutes =require('./routes/uploadreports')
app.use(bodyParser.json())
app.use(cors())
// app.use('/api/mds',verify)

app.use(authRoutes)
app.use(uploadRoutes)









Users.hasMany(Images, { foreignKey: 'userid', as: 'userdata' });
Images.belongsTo(Users, { foreignKey: 'userid', as: 'user' });

const initializeDatabase = async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');
      await sequelize.sync(); 
      console.log('Database and tables have been synced successfully.');
    } catch (error) {
      console.error('Error initializing the database:', error);
    }
  };
  
  initializeDatabase();
  
  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
  });