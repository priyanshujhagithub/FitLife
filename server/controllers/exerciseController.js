import Session from '../models/SessionModel.js';

export const addExercise = async (req, res) => {
    try {
        const userId = req.user.id;
        const { sessionConfig, data } = req.body;
        if (!sessionConfig || !data) {
            return res.status(400).json({ success: false, message: 'Missing sessionConfig or data' });
        }
        const session = await Session.create({
            user: userId,
            sessionConfig,
            data
        });
        res.status(201).json({ success: true, session });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to add session",
            error: err.message
        });
    }
};

export const getMyExercises = async (req, res) => {
    try {
        const userId = req.user.id;
        const list = await Session.find({ user: userId }).sort('-date');
        res.json({ success: true, exercises: list });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch sessions",
            error: err.message
        });
    }
};

