const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

const addUser = async () => {
  try {
    const hashedPassword = await bcrypt.hash('sandeep', 10); // Change this to your desired password
    const user = new User({
      name: 'Sandeep Mopidevi',
      email: 'sandeep.mopidevi@yahoo.com',
      password: hashedPassword,
    });
    await user.save();
    console.log('User added successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error adding user:', err.message);
    mongoose.connection.close();
  }
};

addUser();
