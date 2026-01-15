let mongoose = require('mongoose');

const connectDB = async () =>{
    try{
       let conn =  await mongoose.connect(process.env.MONGO_URI);
       console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch(err){
        console.error('Error connecting mongo db ',err);
        process.exit(1);
    }
}

module.exports = connectDB;