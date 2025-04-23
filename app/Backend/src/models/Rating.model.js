// import mongoose from "mongoose";

// const ratingSchema = new mongoose.Schema(
//     {
//         FAQId:{
//             type:mongoose.Schema.Types.objectId,
//             ref:"FAQ",
//             required:true
//         },
//         // customerIp:{
//         //     type:String
//         // },
//         rating:{
//             type:Number,
//             required:true,
//             min:1,
//             max:5
//         },
//         // feedback:{
//         //     type:String
//         // },
//         customerId: {
//             type: String,
//             default: null
//         },
//         comment: {
//             type: String,
//             default: ""
//         },
//         submittedAt: {
//             type: Date,
//             default: Date.now,
//         }
//     },
//     { timestamps: true }
// );

// export const Rating = mongoose.model("Rating", ratingSchema)

import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
    {
        FAQId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FAQ",
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        customerId: {
            type: String,
            default: null
        },
        comment: {
            type: String,
            default: ""
        },
        submittedAt: {
            type: Date,
            default: Date.now,
        }
    },
    { timestamps: true }
);

export const Rating = mongoose.model("Rating", ratingSchema);
