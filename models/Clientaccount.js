import mongoose from "mongoose";

const ClientaccountSchema = new mongoose.Schema(
  {
    accountName: {
      type: String,
      required: true,
    },
    vClientNumber: Number,
    vWebsite: String,
    notes: String,
  },
  { timestamps: true }
);

const Clientaccount = mongoose.model("Clientaccount", ClientaccountSchema);
export default Clientaccount;
