import ClassModel from "../model/class.model";


export const createClass = async (req, res) => {
    try {
        req.body.school = req.school._id;
        const classs = await ClassModel.create(req.body);
        res.json(classs);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}