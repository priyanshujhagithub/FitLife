import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from '../components/common/button';
import { Input } from '../components/common/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/card';

function NewSessionSetup({ setSessionConfig }) {
    const navigate = useNavigate();
    
    const [sessionData, setSessionData] = useState({
        sessionName: "",
        targetReps: "",
        targetSets: "",
        workoutType: "strength",
        duration: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSessionData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleStartSession = () => {
        setSessionConfig(sessionData);
        navigate('/newSession/currentWorkout');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-purple-50/30 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">New Workout Session</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="sessionName" className="text-sm font-medium">
                                Session Name
                            </label>
                            <Input
                                id="sessionName"
                                name="sessionName"
                                type="text"
                                value={sessionData.sessionName}
                                onChange={handleInputChange}
                                placeholder="e.g., Upper Body, Leg Day, Full Body"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="targetReps" className="text-sm font-medium">
                                Target Reps (per set)
                            </label>
                            <Input
                                id="targetReps"
                                name="targetReps"
                                type="number"
                                value={sessionData.targetReps}
                                onChange={handleInputChange}
                                placeholder="e.g., 12"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="targetSets" className="text-sm font-medium">
                                Target Sets (per exercise)
                            </label>
                            <Input
                                id="targetSets"
                                name="targetSets"
                                type="number"
                                value={sessionData.targetSets}
                                onChange={handleInputChange}
                                placeholder="e.g., 3"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="workoutType" className="text-sm font-medium">
                                Workout Type
                            </label>
                            <select
                                id="workoutType"
                                name="workoutType"
                                value={sessionData.workoutType}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="strength">Strength Training</option>
                                <option value="cardio">Cardio</option>
                                <option value="flexibility">Flexibility</option>
                                <option value="mixed">Mixed</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="duration" className="text-sm font-medium">
                                Duration (minutes)
                            </label>
                            <Input
                                id="duration"
                                name="duration"
                                type="number"
                                value={sessionData.duration}
                                onChange={handleInputChange}
                                placeholder="e.g., 60"
                                min="1"
                            />
                        </div>

                        <div className="flex space-x-2">
                            <Button
                                type="button"
                                onClick={handleStartSession}
                                className="flex-1"
                                disabled={!sessionData.sessionName}
                            >
                                Start Workout Session
                            </Button>
                            <Button
                                type="button"
                                onClick={() => navigate('/')}
                                variant="outline"
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default NewSessionSetup; 