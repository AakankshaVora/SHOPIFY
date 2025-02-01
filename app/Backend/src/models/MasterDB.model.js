import mongoose, {Schema} from "mongoose";

const MasterDBSchema = new mongoose.Schema
(
    {
        storeName:{
            type:String,
            required:true,
        },
        shopifyDomain:{
            type:String,
            required:true,
            unique:true
        },
        storeId:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:false
        },
        installedAt:{
            type:Date,
            default:Date.now
        },
        isActive:{
            type:Boolean,
            default:true
        },
        plan:{
            type:String,
            enum:["free","basic","premium"],
            default:"free",
        },
        lastSynced:{
            type:Date,
        }
    },
    {timestamps:true}
);
// export const MasterDB = mongoose.model("MasterDB", MasterDBSchema)
export const MasterDB = mongoose.models.MasterDB || mongoose.model("MasterDB", MasterDBSchema);
