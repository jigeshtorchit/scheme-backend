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

        // Check if all input data is empty
        if (!implementedBy && !disabilityPercentage && !age && !annualIncome && !genderEligibility) {
            return res.status(400).send('Empty input data. Please provide at least one filter criteria.');
        }
        
        // Extract pagination parameters from the URL
        const page = parseInt(req.query.page) || 1;  // Default page is 1
        const limit = parseInt(req.query.limit) || 10; // Default limit is 10 items per page

        // Validate and sanitize page and limit parameters
        const parsedPage = parseInt(page);
        const parsedLimit = parseInt(limit);

        if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage <= 0 || parsedLimit <= 0) {
            return res.status(400).send('Invalid pagination parameters');
        }

        // Calculate the skip value based on the page and limit
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

               // Adjust pageSize dynamically based on the totalCount
               const calculatedPageSize = totalFilteredFacilities < parsedLimit ? totalFilteredFacilities : parsedLimit;

            const filteredFacilities = await scheme
                .find(filter)
                .skip(skip)
                .limit(calculatedPageSize);
            res.status(200).send({
                data: filteredFacilities,
                totalCount: totalFilteredFacilities,
                pageSize: calculatedPageSize,
                currentPage: parsedPage
            });
        } catch (error) {
            console.log(error)
            res.status(500).send('Internal Server Error');
        }


    } catch (error) {
        console.error('Error filtering facilities:', error);
        res.status(500).send('Internal Server Error');
    }
}

// async function getAllFacilities(req, res) {
//     try {
//         // Extract pagination parameters from the URL
//         const page = parseInt(req.query.page) || 1;  // Default page is 1
//         const limit = parseInt(req.query.limit) || 10; // Default limit is 10 items per page

//         // Validate and sanitize page and limit parameters
//         const parsedPage = parseInt(page);
//         const parsedLimit = parseInt(limit);

//         if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage <= 0 || parsedLimit <= 0) {
//             return res.status(400).json({ error: 'Invalid pagination parameters' });
//         }

//         // Calculate the skip value based on the page and limit
//         const skip = (parsedPage - 1) * parsedLimit;

//         const allFacilities = await scheme
//             .find()
//             .skip(skip)
//             .limit(parsedLimit);

//         res.status(200).json({
//             data: allFacilities,
//             totalCount: await scheme.countDocuments(),
//             pageSize: parsedLimit,
//             currentPage: parsedPage
//         });
//     } catch (error) {
//         console.error('Error getting all facilities:', error);
//         res.status(500).send('Internal Server Error');
//     }
// }


module.exports = {
    filterFacilities,
    // getAllFacilities
};
