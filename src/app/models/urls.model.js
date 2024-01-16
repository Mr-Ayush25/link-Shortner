import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    pastVisits: [
      {
        timeLine: {
          type: Number,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);
export const URL = mongoose.models.URL || mongoose.model("URL", urlSchema);
