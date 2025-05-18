import Exercise from '../models/exerciseModel';

export const addExercise = async (req, res) => {
    try {
        const { name, muscleGroup, sets, reps, weight, duration, date } = req.body;
        const userId = req.user.id;

        const ex = await Exercise.create({
            user: userId, name, muscleGroup, sets, reps, weight, duration, date
        });

        res.status(201).json({ success: true, exercise: ex });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to add exercise",
            error: err.message
        });
    }
};

export const getMyExercises = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const list = await Exercise.find({ user: userId }).sort('-date');
            res.json({ success: true, exercises: list });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch exercises",
            error: err.message
        });
    }
};

