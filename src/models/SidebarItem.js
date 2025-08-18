import mongoose from "mongoose";

const SidebarItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: "File",
    },
    order: {
      type: Number,
      default: 0,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    subItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SidebarItem",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.SidebarItem ||
  mongoose.model("SidebarItem", SidebarItemSchema);
