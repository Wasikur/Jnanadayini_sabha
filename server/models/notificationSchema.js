const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    text: { type: String, required: true },
  },
  { timestamps: true } // ✅ Adds createdAt & updatedAt automatically
);

// Auto-increment for 'id'
notificationSchema.plugin(AutoIncrement, { inc_field: "id", start_seq: 1000 });

// Ensure updatedAt updates on edit
notificationSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model("Notification", notificationSchema);
