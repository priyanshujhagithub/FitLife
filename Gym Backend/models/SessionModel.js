import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    sessionConfig: {
        type: Object,
        required: true
    },
    data: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const SessionModel = mongoose.models.Session || mongoose.model('Session', sessionSchema);

export default SessionModel;