import SubjectModel from "../model/subject.model.js";

export const createSubject = async (req, res) => {
    try {
        req.body.school = req.school._id;
        const subject = await SubjectModel(req.body)
        res.json(subject);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

export const fetchSubjects = async (req, res) => {
    try {
        const subjects = await SubjectModel.find({school: req.school._id});
        res.json(subjects);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateSubjects = async (req, res) => {
    try {
        const subjects = await SubjectModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!subjects){
            return res.status(404).json({message: "Subject not fount"});
        }
        res.json(subjects);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteSubjects = async (req, res) => {
    try {
        const subjects = await SubjectModel.findByIdAndDelete(req.params.id);
        if(!subjects){
            return res.status(404).json({message: "Subject not fount"});
        }
        res.json({message: "Subject deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

