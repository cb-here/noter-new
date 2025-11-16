import mongoose from "mongoose";
import { auditFields } from "./common/commonFields.js";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    content: {
        type: String,
        required: true
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    // ...auditFields
}, {timestamps: true})

const Note = mongoose.model("Note", noteSchema)

export default Note;