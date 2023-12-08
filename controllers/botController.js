const questionAnswer = require('../models/bot');

async function chatBot(req, res) {
    try {
        const { userQuestion } = req.body;
        const result = await questionAnswer.findOne({ question: userQuestion });
        const answer = result ? result.answer : "Please enter valid information!!";
        res.status(200).send({ answer });
    } catch (error) {
        console.error('Error answering question:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    chatBot
};