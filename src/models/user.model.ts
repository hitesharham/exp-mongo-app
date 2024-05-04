import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, required: false },
});

const User = model("user", userSchema);

export default User;
