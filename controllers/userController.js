import bcrypt from "bcrypt"; // bcrypt module import edildi 
import jwt from 'jsonwebtoken';
import Photo from '../models/photoModel.js';
import User from '../models/userModel.js'; // model import edildi

const createUser = async (req, res) => { // POST metoduna gore createPhoto islemini yaptirdi

    try {

        const user = await User.create(req.body)


        res.status(201).json({ user: user._id })
    } catch (error) {

        console.log("Error", error);

        let errors2 = {};


        if (error.code === 11000) {
            errors2.email = "The Email is already registered";
        }
        if (error.name === 'ValidationError') {
            Object.keys(error.errors).forEach((key) => {
                errors2[key] = error.errors[key].message;
            });
        }
        console.log("errors2:::", errors2);
        res.status(400).json(errors2);

    }

};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('req.body', req.body);
        console.log("username", username);
        console.log("password", password);

        const user = await User.findOne({ username });

        let same = false;

        if (user) {
            same = await bcrypt.compare(password, user.password);
        } else {
            return res.status(401).json({
                succeded: false,
                error: 'There is no such user',
            });
        }

        if (same) {

            const token = createToken(user._id);
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
            })

            res.redirect("/users/dashboard")
        } else {
            res.status(401).json({
                succeded: false,
                error: 'Passwords are not matched',
            });
        };
    } catch (err) {
        res.status(400).json(errors);
    };
};

const getDashboardPage = async (req, res) => {
    const photos = await Photo.find({ user: res.locals.user._id })
    res.render('dashboard', {
        link: 'dashboard',
        photos
    });
}


const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
}


const getAllUsers = async (req, res) => { // GET metoduna gore getAllPhotos islemini yaptirdi
    try {
        const users = await User.find({}); // photo tablosundan veri cekildi
        res.status(200).render('users', {
            users,
            link: 'users',
        });
    } catch (error) {
        res.status(500).json({ // 500 oluşturuldu 
            succeded: false,
            error
        });
    }
};

const getAUser = async (req, res) => { // GET metoduna gore getAllPhotos islemini yaptirdi
    try {
        const user = await User.findById({ _id: req.params.id }); // photo tablosundan veri cekildi
        res.status(200).render('user', {
            user,
            link: 'users',
        });
    } catch (error) {
        res.status(500).json({ // 500 oluşturuldu 
            succeded: false,
            error
        });
    }
};

export { createUser, getDashboardPage, loginUser, getAllUsers, getAUser };

