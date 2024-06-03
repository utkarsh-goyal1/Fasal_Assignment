const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const jwt = require('jsonwebtoken')
const secret = "hi";
const bcrypt = require('bcrypt')
const PlayList = require('../Models/PlayList');

router.post('/signup', async (req, res) => {
    // console.log(req.body);
    const { name, email, password, confirmPassword } = req.body;
    if (!(name && email && password && confirmPassword)) {
        // console.log("All Fields Are Necessary")
        return res.status(400).send("All Fields are necessary");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        // console.log("Already exists")
        return res.status(401).send("User With This Name Already Exists");
    }
    else if (password == confirmPassword) {
        try {
            const salt = bcrypt.genSaltSync(10);
            const myEncPassword = bcrypt.hashSync(password, salt);
            const user = await User.create({
                name: name,
                email: email,
                password: myEncPassword
            });
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(400).json("User not Created");
        }
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            // console.log("All Fields Are Necessary")
            return res.status(400).send("All details are necessary")
        }
        const user = await User.findOne({ email: email })
        if (!user) {
            // console.log("Not exists")
            return res.status(401).send("User does not exists")
        }
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                {
                    id: user._id, email//payload
                },
                secret,//process.env.jwtsecret (secretKey) 
                {
                    expiresIn: "2h" //extra optional 
                }
            );
            user.password = undefined;
            return res.status(200).json({
                success: true,
                token,
                user
            });
        }
        else {
            console.log("Password is incorrect");
            return res.status(400).send("Password is incorrect");
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json("User not found");
    }
})

router.post('/createList', async (req, res) => {
    try {
        const { id, title, movies, isPublic } = req.body;
        // Validate the request data
        if (!id || !title || !Array.isArray(movies) || movies.length === 0) {
            return res.status(400).json({ message: 'Invalid data provided' });
        }

        const playlist = await PlayList.create({ title, movies, isPublic });
        const user = await User.findById(id);

        // Add the new list to the user's createdLists
        user.createdLists.push(playlist);

        // Save the updated user document
        await user.save();
        // Return a success response
        res.status(200).json({ message: 'List created successfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'An error occurred while creating the list' });
    }
});

router.get('/getCreatedLists/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate('createdLists');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: 'An error occurred while creating the list' });
    }
})

router.get('/ShowList', async (req, res) => {
    try {
        const { id } = req.query;
        const playlist = await PlayList.findById(id);
        console.log(playlist);
        return res.status(200).json(playlist);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: 'An error occurred while creating the list' });
    }
})
module.exports = router;