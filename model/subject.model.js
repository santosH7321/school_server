import { Schema, model } from "mongoose";

const SubjectSchema = new Schema({
    school: {
        type: Schema.Types.ObjectId,
        ref: "School",
    },
    subjectName: {
        type:String,
        required: true,
    },
    fullMarks: {
        type: Number,
        required: true
    },

}, {timestamps: true})

const SubjectModel = model("Subject", SubjectSchema);
export default SubjectModel;