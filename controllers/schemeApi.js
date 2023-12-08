const express = require('express');
const Scheme = require('../models/scheme');
// const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/categories/disability', async (req, res) => {
    try {
        const disabilityPercentage = await Scheme.aggregate([
            { $group: { _id: '$disabilityPercentage' } },
            { $project: { _id: 0, option: '$_id' } },
        ]);
        res.status(200).send(disabilityPercentage);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.get('/categories/gender', async (req, res) => {
    try {
        const genderEligibility = await Scheme.aggregate([
            { $group: { _id: '$genderEligibility' } },
            { $project: { _id: 0, option: '$_id' } },
        ]);
        res.status(200).send(genderEligibility);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.get('/categories/age', async (req, res) => {
    try {
        const age = await Scheme.aggregate([
            { $group: { _id: '$age' } },
            { $project: { _id: 0, option: '$_id' } },
        ]);
        res.status(200).send(age);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.get('/categories/state', async (req, res) => {
    try {
        const implementedBy = await Scheme.aggregate([
            { $group: { _id: '$implementedBy' } },
            { $project: { _id: 0, option: '$_id' } },
        ]);
        res.status(200).send(implementedBy);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.get('/categories/income', async (req, res) => {
    try {
        const income = await Scheme.aggregate([
            { $group: { _id: '$annualIncome' } },
            { $project: { _id: 0, option: '$_id' } },
        ]);
        res.status(200).send(income);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.post('/categories/result', async (req, res) => {
    try {
        const {
            disabilityPercentage,
            genderEligibility,
            age,
            implementedBy,
            annualIncome,
        } = req.body;

        if (!implementedBy && !disabilityPercentage && !age && !annualIncome && !genderEligibility) {
            return res.status(400).send("Empty input data. Please provide at least one filter criteria.");
        }

        const filter = {};
        if (disabilityPercentage) {
            filter.disabilityPercentage = disabilityPercentage;
        }
        if (genderEligibility) {
            filter.genderEligibility = genderEligibility;
        }
        if (age) {
            filter.age = age;
        }
        if (implementedBy) {
            filter.implementedBy = implementedBy;
        }
        if (annualIncome) {
            filter.annualIncome = annualIncome;
        }
        const filteredSchemes = await Scheme.find(filter);
        res.status(200).send(filteredSchemes);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

module.exports = router;
