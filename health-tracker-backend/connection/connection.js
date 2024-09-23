const mongoose = require('mongoose')

const dbUrl =`${process.env.MONGO_URI}`

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(dbUrl)
        console.log(`MongoDb Connected :${conn.connection.host}`);
        
    }
    catch(error){
        console.log(`Error while Connecting to Db , ${error}`);
        process.exit(1)
        
    }
}

module.exports=connectDB;