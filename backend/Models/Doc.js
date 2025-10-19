import mongoose from "mongoose";

// Sub-schema for dynamic fields
const fieldSchema = new mongoose.Schema({
  label: { type: String, required: true }, 
  value: { type: mongoose.Schema.Types.Mixed }, 
  type: { type: String, default: "text" }, // field type for UI
  required: { type: Boolean, default: false },
});
//Sub-Schema for version
const versionSchema = new mongoose.Schema({
  versionNo: { type: Number, required: true },
  fields: [fieldSchema],
  reviewerComments: { type: String },
  status: { type: String, enum: ["draft","pending", "approved", "rejected"], default: "draft" },
  reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now }
});
const DocSchema =  new mongoose.Schema({
    id: {type:Number,required:true,unique:true}, 
    title:{type:String,required:true},
    requirement:{type:String,required:true},
    intro:{type:String,required:true},
    useCase:{type:String,required:true},
   process:{type:String,required:true},
   fields:[fieldSchema],
    status: {
      type: String,
      enum: ["Draft", "Under Review", "Approved", "Rejected"],
      default: "Draft",
    },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
 versions: [versionSchema], // Array of versions
     currentVersion: { type: Number, default: 1 },  
},{ timestamps: true })
export const Doc = mongoose.model('Doc',DocSchema);
