import mongoose from "mongoose";
const profileSchema = mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        required:true,
    },
    domain:{
        type:String,
        required:true,
    },
    available: {
        type: Boolean,
        required: true 
      }

})


const ProfileData = new mongoose.model("ProfileData",profileSchema)
export default ProfileData