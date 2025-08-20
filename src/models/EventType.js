import mongoose from "mongoose";

const EventTypeSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, enum: ["system", "custom"], required: true },
    description: { type: String, default: "" },

    schema: { type: mongoose.Schema.Types.Mixed, default: {} },
    isActive: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.EventType ||
  mongoose.model("EventType", EventTypeSchema);
