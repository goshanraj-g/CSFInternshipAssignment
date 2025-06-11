const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    make: { type: String, required: true }, // ("Toyota", or "Porsche")
    model: { type: String, required: true }, // ("Camry", or "GT3RS")
    year: { type: Number, required: true },
    rating: { type: Number, min: 1, max: 5, required: true }, // 1-5 Rating
    comment: { type: String, required: true }, // "The Toyota Corolla is extremely fuel efficient! " or "The GT3RS is the ultimate track car, it blew my mind"
  },
  { timestamps: true }
); // adds timestamps automatically

// export model
module.exports = mongoose.model("Feedback", FeedbackSchema);
