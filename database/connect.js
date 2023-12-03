import mongoose from "mongoose";

const connect = 'mongodb+srv://sauravanand243:dXOJHBFQbWaJ7juO@cluster0.jbbncif.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(connect,{

}).then(()=>{
    console.log("Connected to Mongodb")
}).catch((error)=>{
    console.log("Connection Failed: ",error)
})