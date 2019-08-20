import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";
import mongoose from "../lib/mongoose";
import { PASSWORD_REGEX, ROLE_USER } from "../constants";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [isEmail, "Invalid email"],
  },
  password: {
    type: String,
    required: true,
    validate: PASSWORD_REGEX,
  },
  roles: {
    type: [String],
    required: true,
    default: [ROLE_USER],
  },
});

userSchema.statics.findByLogin = async function findByLogin(login) {
  let user = await this.findOne({ username: login });
  if (!user) {
    user = await this.findOne({ email: login });
  }
  return user;
};

userSchema.pre("save", async function preSave() {
  this.password = await this.generatePasswordHash();
});

userSchema.methods.generatePasswordHash = async function generatePasswordHash() {
  const saltRounds = 10;
  return bcrypt.hash(this.password, saltRounds);
};

userSchema.methods.isValidPassword = async function isValidPassword(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
