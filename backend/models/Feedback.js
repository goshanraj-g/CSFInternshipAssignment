const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema({
    make: String, // ("Toyota", or "Porsche")
    model: String, // ("Camry", or "GT3RS")
    rating: Number, // 1-5 Rating
    comment: String // "The Toyota Corolla is extremely fuel efficient! " or "The GT3RS is the ultimate track car, it blew my mind"
}, {timestamps: true}); // adds timestamps automatically

// export model
module.exports = mongoose.model('Feedback', FeedbackSchema);