import SessionModel from '../models/SessionModel.js';

export const addExercise = async (req, res) => {
    try {
        const userId = req.user.id;
        const { sessionConfig, data } = req.body;
        if (!sessionConfig || !data) {
            return res.status(400).json({ success: false, message: 'Missing sessionConfig or data' });
        }
        const session = await SessionModel.create({
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
        const list = await SessionModel.find({ user: userId }).sort('-date');
        res.json({ success: true, exercises: list });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch sessions",
            error: err.message
        });
    }
};

export const deleteSession = async (req, res) => {
    try {
        const userId = req.user.id;
        const { sessionId } = req.params;
        
        if (!sessionId) {
            return res.status(400).json({ 
                success: false, 
                message: 'Session ID is required' 
            });
        }
        
        const session = await SessionModel.findOne({ _id: sessionId, user: userId });
        
        if (!session) {
            return res.status(404).json({ 
                success: false, 
                message: 'Session not found or you do not have permission to delete it' 
            });
        }
        
        await SessionModel.findByIdAndDelete(sessionId);
        
        res.json({ 
            success: true, 
            message: 'Session deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete session",
            error: err.message
        });
    }
};

