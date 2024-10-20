const mongoose = require("mongoose")

exports.ConnectDB = async()=>{
    try {
                await mongoose.connect(process.env.MONGO_URI)
                console.log(`the db is connect with ${mongoose.connection.host}`.bgCyan.red.underline);
                
    } catch (error) {
        console.log(error.message);
        
        mongoose.disconnect()
            process.exit(1)
    }
}