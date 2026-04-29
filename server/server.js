//* All Files needed importing HERE ::::: 
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/mongoDB')
const auth = require('./routes/auth');
const event = require('./routes/event');
const category = require('./routes/category');
const cors = require("cors");
const CategorySeeding = require('./models/Category'); //& To put the seed data in cat
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connectDB();


//* Routing Here ::::: 
app.use('/api/auth', auth);
app.use('/api/events', event);
app.use('/api/categories', category);


//* Run the Server overhere -->
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

//& Seed Data in Category
const seed = async () => {
  const count = await CategorySeeding.countDocuments();
  if (count === 0) {
    await CategorySeeding.insertMany([
      { name: 'Sports' },
      { name: 'Music' },
      { name: 'Religion' },
      { name: 'Study' },
      { name: 'Family' },
      { name: 'Relation' }
    ]);
    console.log('Seed added');
  }
};
seed(); //& go to seeding data fun.

