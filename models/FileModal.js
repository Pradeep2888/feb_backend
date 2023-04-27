const mongoose = require("mongoose")

const fileSchema=new mongoose.Schema({
    file_name:{type:String,required:true},
    file_url:{type:String,required:true},
})

const FileModel=mongoose.model("user",fileSchema)


module.exports={FileModel}