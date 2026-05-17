const mongoose = require("mongoose");

const JobRequestSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    description: { type: String, required: true, trim: true },

    category: {
      type: String,
      required: true,
      enum: ["Plumbing", "Electrical", "Painting", "Joinery"],
    },

    location: { type: String, required: true },

    contactName: { type: String, required: true },

    contactEmail: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobRequest", JobRequestSchema);