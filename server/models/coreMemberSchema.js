const mongoose = require("mongoose");

const coreMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    year: { type: String, required: true },
    role: {
      type: String,
      enum: ["General Secretary", "President"],
      required: true,
    },
  },
  { timestamps: true }
);

const CoreMember = mongoose.model("CoreMember", coreMemberSchema);
module.exports = CoreMember;
