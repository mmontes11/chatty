import mongoose from "../lib/mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
