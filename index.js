const express=require("express")
const cors=require("cors")
const {connection}=require("./config/db")
const fileUpload = require("express-fileupload");
const { FileModel } = require("./models/FileModal");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dz0mytgqq",
    api_key: "741316233872263",
    api_secret: "_tS12r6anXnyhxe2-wGaOJFbjZA"
  });
  




const app=express()
const PORT=8080
app.use(cors())
app.use(express.json())
app.use(fileUpload({
    useTempFiles:true
}))

app.get("/",async(req,res)=>{
  const data=await FileModel.find()
  console.log(data)
    res.send({"data":data})
})

app.post("/upload",async (req,res)=>{
    const file=req.files.file
    const name=file.name
    

    cloudinary.uploader.upload(file.tempFilePath,async(err,result)=>{
    
       if(result){
        const new_data=new FileModel({
            file_name:name,
            file_url:result.url
        })
        try{
            await new_data.save()
            res.send("hi")
        }
        catch(err){
            console.log(err)
            res.send({ "msg": "Something went wrong" })
        }
       }
       else{
        console.log(err)
       }
    })
})



app.listen(PORT,async()=>{
    try {
        await connection
        console.log("Connected to DB successfully")
    }
    catch(err){
        console.log(err)
    }
    console.log(`connected to ${PORT} successfully`)
})