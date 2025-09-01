import TeacherModel from "../model/teacher.model.js";

export const createTeachers = async (req, res) => {
    try {
        req.body.school = req.school._id;
        const Teacher = await TeacherModel(req.body)
        res.json(Teacher);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

export const fetchTeachers = async (req, res) => {
    try {
        const Teachers = await TeacherModel.find({school: req.school._id});
        res.json(Teachers);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateTeachers = async (req, res) => {
    try {
        const Teachers = await TeacherModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!Teachers){
            return res.status(404).json({message: "Teacher not fount"});
        }
        res.json(Teachers);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteTeachers = async (req, res) => {
    try {
        const Teachers = await TeacherModel.findByIdAndDelete(req.params.id);
        if(!Teachers){
            return res.status(404).json({message: "Teacher not fount"});
        }
        res.json({message: "Teacher deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


export const uploadTeacherImages = async (req, res) => {
    try {
        await TeacherModel.findByIdAndUpdate(req.params.id, {image: req.file.path});
        res.json({message: "Upload success"})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

