import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
  },
  userName: {
    type: String,
    required: true,
    minlength: 5,
    unique: true,
  },
  books: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }],
    default: [],
  },
});

const User = mongoose.model("user", userSchema);

export default User;
