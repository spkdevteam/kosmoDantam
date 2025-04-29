const { default: mongoose } = require("mongoose");

const buSettingsSchema = mongoose.Schema({
    role: {type: String, required: true },
    roleId: {type: Number,required: true },
    BUPrefix:{type:String,default:'KC'}, 
    firstName: {type: String,required: true }, 
    lastName: {type: String,required: true }, 
    middleName: {type: String,default: null },
    email: {type: String,required: true, unique: true,    },
    phone: {type: String,required: true,},
    password: {type: String,required: true }, 
    tc: {type: Boolean,required: true }, 
    isUserVerified: {type: Boolean,default: false }, 
    isActive: {type: Boolean,default: true }, 
    gender: {type: String,enum: ['Male', 'Female', 'Prefer not to say'], default: 'Prefer not to say' },
    profileImage: {type: String,default: null }, profileCreated: {type: Boolean,default: false }, 
    isCreatedBySuperAdmin: {type: Boolean,default: false }, 
    activeYear:{type:String,default:'2024'}
    
  });

  module.exports = buSettingsSchema