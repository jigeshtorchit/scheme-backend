const Joi = require("@hapi/joi");
const Scheme = require("../models/scheme")

const schemeValidation = Joi.object({
    niProvider: Joi.string().required(),
    schemeName: Joi.string().required(),
    implementedBy: Joi.string().required(),
    domainDescription: Joi.string().required(),
    eligibleDisabilities: Joi.string().required(),
    percentageOfDisability: Joi.string().required(),
    minAge: Joi.number().required(),
    maxAge: Joi.number().required(),
    incomeLimit: Joi.string().required(),
    genderEligibility: Joi.string().required(),
    attachments: Joi.string().required(),
    comments: Joi.string().required(),
    emailAddress: Joi.string().required(),
});

exports.schemeAdd = async (req, res) => {
    try {
        const {
            niProvider,
            schemeName,
            implementedBy,
            domainDescription,
            eligibleDisabilities,
            percentageOfDisability,
            minAge,
            maxAge,
            incomeLimit,
            genderEligibility,
            attachments,
            comments,
            emailAddress
        } = req.body;

        const { error } = schemeValidation.validate(req.body, { abortEarly: false });

        if (error) {
            const validationErrors = error.details.map(detail => detail.message);
            return res.status(400).send(validationErrors);
        }

        const existingScheme = await Scheme.findOne({ emailAddress });
        if (existingScheme) {
            return res.status(400).send("Scheme with this email address already exists");
        }

        const newScheme = new Scheme({
            niProvider,
            schemeName,
            implementedBy,
            domainDescription,
            eligibleDisabilities,
            percentageOfDisability,
            minAge,
            maxAge,
            incomeLimit,
            genderEligibility,
            attachments,
            comments,
            emailAddress,
        });

        // Use async/await for saving the scheme
        await newScheme.save();

        res.status(200).send("Scheme Data Added Successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.schemeEdit = (async (req, res) => {
    try {
        const schemeEditing = await Scheme.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!schemeEditing) {
            return res.status(404).send("No Data");
        }

        return res.status(200).send("Scheme details are Updated Successfully");
    } catch (err) {
        console.error(err);
        res.status(401).send(err);
    }
});

exports.schemeView = async (req, res) => {
    const perPage = 10;
    const page = parseInt(req.query.page) || 1; // Parse the page query parameter or default to 1

    try {
        const totalSchemes = await Scheme.countDocuments();
        const totalPages = Math.ceil(totalSchemes / perPage);

        const data = await Scheme
            .find()
            .sort({ _id: -1 })
            .skip((page - 1) * perPage)
            .limit(perPage);

        if (data && data.length > 0) {
            res.status(200).send({
                data,
                totalPages: totalPages,
                currentPage: page,
            });
        } else {
            res.status(400).send("No Scheme");
        }
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
};

exports.schemeSearch = (async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Parse the page query parameter or default to 1
        const perPage = 10; // Set the number of items per page

        // Use the 'key' route parameter for searching
        const key = req.params.key;

        // Construct a query to search for records containing the 'key'
        const query = {
            $or: [
                { First_Name: { $regex: key, $options: "i" } },

                { last_Name: { $regex: key, $options: "i" } },
                { User_Name: { $regex: key, $options: "i" } },
                { Departement: { $regex: key, $options: "i" } },
                { Email: { $regex: key, $options: "i" } },
                { Emaployee_ID: { $regex: key, $options: "i" } },
                // { Mobile_No: isNaN(numericKey) ? { $regex: key, $options: "i" } : numericKey },
            ]
        };

        // Perform the search with pagination
        const users = await allemployee
            .find(query)
            .sort({ key: 1 })
            .skip((page - 1) * perPage)
            .limit(perPage);
        if (users && users.length > 0) {
            res.status(200).send(users);
        } else {
            res.status(400).send("No Users");
        }
    } catch (err) {
        res.status(500).send(err); // Return a structured error response
    }
});