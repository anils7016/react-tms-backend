import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //required: true,
      min: 2,
      max: 100,
    },
    fname: {
      type: String,
      required: true,
      min: 2,
    },
    lname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 3,
    },
    profileImage: {
      filename: String,
      contentType: String,
      data: Buffer,
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
