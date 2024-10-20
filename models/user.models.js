const mongoose =require("mongoose")
const bcrypt = require("bcryptjs")


const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        lower:true,
        trim:true

    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


Schema.pre("save",async function(next){
    const user = this;

    if(user.isModified("password")){
        this.password = await bcrypt.hash(user.password,10)
    }
    next()
})

Schema.methods.comparePassword = async function(str_pass){
    const isMatch = await bcrypt.compare(str_pass,this.password);
    return isMatch
}

const model = mongoose.model("user",Schema)

module.exports = model