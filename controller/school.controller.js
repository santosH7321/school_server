import SchoolModel from "../model/school.model.js";

export const createSchool = async (req, res) => {
    try {
        const school = await SchoolModel.create(req.body);
        res.json(school)
    } catch (error) {
        console.error("Error creating school:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}