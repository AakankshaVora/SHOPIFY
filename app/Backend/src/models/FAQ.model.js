import mongoose, {Schema} from "mongoose";


const FAQSchema = new mongoose.Schema(
    {
        storeId:{
            tpye:mongoose.Schema.Types.objectId,
            ref:"MasterDB",
            required:true
        },
        categoryId:{
            type:mongoose.Schema.Types.objectId,
            ref:"Category",
            required:true
        },
        question:{
            type:String,
            required:true
        },
        answer:{
            type:String,
            required:true
        },
        isActive:{
            type:Boolean,
            default:true
        },
        viewCount:{
            type:Number,
            default:0,
        }
    },
    {timestamps:true}
);

export const FAQ = mongoose.model("FAQ", FAQSchema)