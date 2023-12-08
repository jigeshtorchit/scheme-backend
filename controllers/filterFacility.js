const scheme = require('../models/scheme');

async function filterFacilities(req, res) {
    try {
        const {
            implementedBy,
            disabilityPercentage,
            age,
            annualIncome,
            genderEligibility
        } = req.body;

        if (!implementedBy && !disabilityPercentage && !age && !annualIncome && !genderEligibility) {
            return res.status(400).send("Empty input data. Please provide at least one filter criteria.");
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const previousPage = req.query.previous === 'true';
        const updatedPage = previousPage ? Math.max(1, page - 1) : page;
        const parsedPage = parseInt(updatedPage);
        const parsedLimit = parseInt(limit);

        if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage <= 0 || parsedLimit <= 0) {
            return res.status(400).send('Invalid pagination parameters');
        }

        const skip = (parsedPage - 1) * parsedLimit;
        const filter = {
            implementedBy: implementedBy ? { $regex: new RegExp(implementedBy, 'i') } : { $exists: true },
            disabilityPercentage: disabilityPercentage ? disabilityPercentage : { $exists: true },
            age: age ? age : { $exists: true },
            annualIncome: annualIncome ? annualIncome : { $exists: true },
            genderEligibility: genderEligibility ? genderEligibility : { $exists: true },
        };

        try {
            const totalFilteredFacilities = await scheme.countDocuments(filter);
            const calculatedPageSize = totalFilteredFacilities < parsedLimit ? totalFilteredFacilities : parsedLimit;
            const totalPages = Math.ceil(totalFilteredFacilities / calculatedPageSize);

            const filteredFacilities = await scheme
                .find(filter)
                .skip(skip)
                .limit(calculatedPageSize);


            if (filteredFacilities.length === 0) {
                return res.status(404).send('No valid information found.');
            }
            res.status(200).send({
                data: filteredFacilities,
                pageSize: calculatedPageSize,
                totalData: totalFilteredFacilities,
                currentPage: parsedPage,
                totalPages: totalPages
            });
        } catch (error) {
            console.log(error)
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error('Error filtering facilities:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    filterFacilities
};
