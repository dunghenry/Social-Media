const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false, 
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        })
        console.log("Connected DB successfully!!!");
    } catch (error) {
        console.log(error.message);
        console.log("Connected DB failed!!!");
        process.exit(1)
    }
}

module.exports = connectDB;