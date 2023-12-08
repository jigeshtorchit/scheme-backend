const questionAnswer = require('../models/bot');

async function chatBot(req, res) {
    try {
        const { userQuestion } = req.body;

        // Retrieve answer from the database based on the user's question
        const result = await questionAnswer.findOne({ question: userQuestion });
        const answer = result ? result.answer : "Please enter valid information!!";

        // Save the user's question and the chatbot's answer to the database
        // await questionAnswer.create({ question: userQuestion, answer });

        res.status(200).send({ answer });
    } catch (error) {
        console.error('Error answering question:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    chatBot
};