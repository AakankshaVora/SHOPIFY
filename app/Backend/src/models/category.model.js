import mongoose, {Schema} from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        storeId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"MasterDB"
        },
        categoryName:{
            type:String,
            required:true
        },
        description:{
            type:String,
        },
        isActive:{
            type:Boolean,
            default:true
        }
    },
    {timestamps: true}
);

export const Category = mongoose.model("Category", categorySchema)