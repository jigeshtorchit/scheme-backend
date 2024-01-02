const Joi = require("@hapi/joi");
const User = require("../models/user");

const userValidation = Joi.object({
  name: Joi.string(),
  email: Joi.string()
    .email()
    .regex(/^[^\s@]+@gmail\.com$/),
  phone: Joi.number().required()
});

const userUpdateValidation = Joi.object({
    rating: Joi.number(),
    comments: Joi.string(),
  });

exports.userAdd = async(req, res) => {
    try {
        const {
            name,
            email,
            phone
        } = req.body;

        const {error} = userValidation.validate(req.body, {abortEarly: false});
        if(error) {
            const validationErrors = error.details.map(detail => detail.message);
            return res.status(400).send(validationErrors);
        }

        const existingUser = await User.findOne({phone});
        if(existingUser){
            return res.status(403).send("User already exists")
        }
        const newUser = new User ({
            name,
            email,
            phone
        });

        const savedUser = await newUser.save();
        res.status(200).send({ id: savedUser._id, message: "User saved successfully" })
    } catch(err) {
            console.error(err);
            res.status(500).send("Internal server error")
    }
};

exports.userUpdate = async(req, res) => {
    try {
        const { id } = req.params; 
        const {
            rating,
            comments
        } = req.body;

        const {error} = userUpdateValidation.validate(req.body, {abortEarly: false});
        if(error) {
            const validationErrors = error.details.map(detail => detail.message);
            return res.status(400).send(validationErrors);
        }

        const existingUser = await User.findById(id);

        if(!existingUser) {
            return res.status(404).send("User not found")
        }

        existingUser.rating = rating;
        existingUser.comments = comments;


        await existingUser.save();
        res.status(200).send("User updated successfully")
    } catch(err) {
            console.error(err);
            res.status(500).send("Internal server error")
    }
};