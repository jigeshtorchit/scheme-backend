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

        // Extract pagination parameters from the URL
        const page = parseInt(req.query.page) || 1;  // Default page is 1
        const limit = parseInt(req.query.limit) || 10; // Default limit is 10 items per page

        // Validate and sanitize page and limit parameters
        const parsedPage = parseInt(page);
        const parsedLimit = parseInt(limit);

        if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage <= 0 || parsedLimit <= 0) {
            return res.status(400).json({ error: 'Invalid pagination parameters' });
        }

        // Calculate the skip value based on the page and limit
        const skip = (parsedPage - 1) * parsedLimit;

        // Build the filter object based on the provided criteria
        const filter = {};
        if (implementedBy) filter.implementedBy = { $regex: new RegExp(implementedBy, 'i') };
        if (disabilityPercentage) filter.disabilityPercentage = disabilityPercentage;
        if (age) filter.age = age;
        if (annualIncome) filter.annualIncome = annualIncome;
        if (genderEligibility) filter.genderEligibility = genderEligibility;

        try {
            // Check if filter has any criteria
            const hasFilterCriteria = Object.keys(filter).length > 0;

            // If there are no filter criteria, return an empty object
            if (!hasFilterCriteria) {
                return res.status(200).json({
                    data: []
                });
            }

            // Apply the filter criteria and get the total count
            const totalFilteredFacilities = await scheme.countDocuments(filter);

            // Retrieve the filtered facilities with pagination
            const filteredFacilities = await scheme
                .find(filter)
                .skip(skip)
                .limit(parsedLimit);

            res.status(200).json({
                data: filteredFacilities,
                totalCount: totalFilteredFacilities,
                pageSize: parsedLimit,
                currentPage: parsedPage
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }

    } catch (error) {
        console.error('Error filtering facilities:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    filterFacilities
};
