const mongoose = require('mongoose');
require('dotenv').config();

const connectToDB = async () => {
        await mongoose.connect(process.env.DATABASE_URL, {
            dbName: 'QuanLyChungCu',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully!');
};

module.exports = { connectToDB };
