const mongoose = require('mongoose');

const questionAnswerSchema = new mongoose.Schema({
    question: { type: String },
    answer: { type: String } // Add an 'answer' field if you want to store answers.
});

const QA = mongoose.model('QA', questionAnswerSchema);

module.exports = QA;
