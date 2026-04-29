const mongoose = require('mongoose');

 const connectDB = async()=> {
    try{
        await mongoose.connect(process.env.MONOGODB_URL);
        console.log('YOU have connected to MONGO Data Base!')
    }catch(error){
        console.log(error);
    }

}
module.exports = connectDB;