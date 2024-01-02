const mongoose = require('mongoose');

const questionAnswerSchema = new mongoose.Schema({
    question: { type: String },
    answer: { type: String }
});

const QA = mongoose.model('QA', questionAnswerSchema);

module.exports = QA;
