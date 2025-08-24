import SchoolModel from "../model/school.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

