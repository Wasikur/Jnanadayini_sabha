const mongoose = require("mongoose");

const executiveMembersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      required: true,
    },
    phone: { type: String, required: false },
  },
  { timestamps: true }
);

const ExecutiveMember = mongoose.model(
  "ExecutiveMember",
  executiveMembersSchema
);
module.exports = ExecutiveMember;
