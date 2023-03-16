const mongoose = require('mongoose')
const studentSchema =mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:Number,
        required:true,
        minlength:8,
        maxlength:16
    },
    company:{
        type:String,
        required:true,
        trim:true
    }
})
const studentmodel=mongoose.model('nodecrud',studentSchema)
module.exports=studentmodel