import mongoose, {Schema} from "mongoose";


const FAQSchema = new mongoose.Schema(
    {
        storeId:{
            tpye:mongoose.Schema.Types.objecId,
            ref:"MasterDB",
            required:true
        },
        categoryId:{
            type:mongoose.Schema.Types.objecId,
            ref:"Category",
            required:true
        },
        question:{
            tpye:String,
            required:true
        },
        answer:{
            tpye:String,
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