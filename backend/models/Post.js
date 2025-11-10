import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  authorId: String,
  authorName: String,
  text: String,
}, { timestamps: true });

export default mongoose.model("Post", postSchema);
