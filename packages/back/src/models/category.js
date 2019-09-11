import mongoose from "../lib/mongoose";

const categorySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
