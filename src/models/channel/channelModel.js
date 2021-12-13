import mongoose from "mongoose";

const channelSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
