import mongoose, {Schema} from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        storeId: {
            tpye:mongoose.Schema.Types.objecId,
            ref:"MasterDB"
        },
        categoryName:{
            tpye:String,
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