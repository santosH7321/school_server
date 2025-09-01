import SchoolModel from "../model/school.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";

export const signup = async (req, res) => {
    try {
        await SchoolModel.create(req.body);
        res.json({message: "Signup successful"})
    } catch (error) {
        console.error("Error creating school:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req?.body;
        if(!email || !password)
            return res.status(400).json({message: "Bad request"});
        
        const school = await SchoolModel.findOne({email}).lean();
        if(!school)
            return res.status(404).json({message: "User not found"});
        
        const isLogin = await bcrypt.compare(password, school.password);
        if(!isLogin)
            return res.status(401).json({message: "Invalid credentials"});


        delete school.password;
        const token = await jwt.sign(school, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.json({message: "Login successful", token: token});
    } catch (error) {
        console.error("Error creating school:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const fetchSchool = async (req, res) => {
    try{
        const school = await SchoolModel.findById(req.school._id, {password: 0})
        res.json(school);
    }
    catch(err)
    {
        res.status(500).json({
            message: err.message
        })
    }
}

export const updateSchool = async (req, res) => {
    try{
        const school = await SchoolModel.findByIdAndUpdate(req.school._id, req.body, {new: true}).lean();
        if(!school)
            return res.status(404).json({message: "User not found"});
        delete school.password;
        res.json({message: "Update successful", school});
    }
    catch(err)
    {
        res.status(500).json({
            message: err.message
        })
    }
}

export const uploadImage = async (req, res) => {
    try {
        await SchoolModel.findByIdAndUpdate(req.school._id, {image: req.file.path});
        res.json({message: "Image uploaded successfully", imagePath: req.file.path});

    }   
    catch(err)
    {
        res.status(500).json({
            message: err.message
        })
    }
}

export const fetchImage = async (req, res) => {
    try {
        await SchoolModel.findById(req.school._id, {image: 1, _id: 0}).lean().then((data) => {
            if(!data || !data.image)
                return res.status(404).json({message: "Image not found"});
            const root = process.cwd();
            const fullUrl = path.join(root, data.image);
            res.sendFile(fullUrl);
        });
    } 
    catch(err)
    {
        res.status(500).json({
            message: err.message
        })
    }
}

