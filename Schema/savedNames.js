import mongoose from "mongoose";

const savedNameSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      ref: "User", // Reference to User email
    },
    savedNames: [
      {
        keyword: { type: String, required: true },
        name: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

// Prevent model overwrite in Next.js hot reload
const SavedNames =
  mongoose.models.SavedNames || mongoose.model("SavedNames", savedNameSchema);

export default SavedNames;
