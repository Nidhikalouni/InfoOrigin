
import mongoose from "mongoose";

const DocSchema =  new mongoose.Schema({
    id:{type:Number,required:true,unique:true},
    title:{type:String,required:true},
    requirement:{type:String,required:true},
    intro:{type:String,required:true},
    useCase:{type:String,required:true},
   process:{type:String,required:true},
    
   
})

export const Doc = mongoose.model('Doc',DocSchema);