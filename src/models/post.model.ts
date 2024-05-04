import mongoose, { Schema, Document } from "mongoose";

/* POST Interfaces */
interface IPost extends Document {
  image: string;
  description: string;
  createdBy: string;
  updatedBy: string;
  likes: string[]; // Array of user IDs who liked the post
  sharedBy: string[]; // Array of user IDs who shared the post
  sharedTo: string[]; // Array of user IDs with whom the post is shared
  comments: {
    userId: string; // User ID who posted the comment
    text: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

/* POST Schema Definition */
const postSchema: Schema = new Schema({
  image: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to User model
  updatedBy: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to User model
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }], // Array of user IDs who liked the post
  sharedBy: [{ type: Schema.Types.ObjectId, ref: "User" }], // Array of user IDs who shared the post
  sharedTo: [{ type: Schema.Types.ObjectId, ref: "User" }], // Array of user IDs with whom the post is shared
  comments: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to User model
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      updateAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create and export Post model
const Post = mongoose.model<IPost>("Post", postSchema);
export default Post;
