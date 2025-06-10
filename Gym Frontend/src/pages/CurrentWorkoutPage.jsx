import React, { useState } from "react";
import ExerciseCard from '../components/workout/Exercisecard';
import HumanBody from '../components/workout/HumanBody';
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from '../components/common/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/card';

function CurrentWorkoutPage(props) {
    const { addNewSet, currExercises, selectedMuscleGroup, EndAndPostWorkoutSession, sessionConfig } = useOutletContext();
    const navigate = useNavigate();

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-xl">{sessionConfig?.sessionName || 'Workout Session'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <span className="font-medium">Type:</span> {sessionConfig?.workoutType}
                        </div>
                        <div>
                            <span className="font-medium">Target Reps:</span> {sessionConfig?.targetReps || 'N/A'}
                        </div>
                        <div>
                            <span className="font-medium">Target Sets:</span> {sessionConfig?.targetSets || 'N/A'}
                        </div>
                        <div>
                            <span className="font-medium">Duration:</span> {sessionConfig?.duration ? `${sessionConfig.duration} min` : 'N/A'}
                        </div>
                        <div>
                            <span className="font-medium">Exercises:</span> {Object.keys(currExercises).length}
                        </div>
                    </div>
                    {sessionConfig?.notes && (
                        <div className="mt-3 p-2 bg-gray-50 rounded">
                            <span className="font-medium">Notes:</span> {sessionConfig.notes}
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="flex gap-2 mb-6">
                <Button 
                    onClick={() => navigate('/newSession/newExercise')}
                    className="bg-purple-600 hover:bg-purple-700"
                >
                    Add New Exercise
                </Button>
                <Button 
                    onClick={async () => { await EndAndPostWorkoutSession(); }}
                    variant="outline"
                    className="border-red-500 text-red-600 hover:bg-red-50"
                >
                    End Workout Session
                </Button>
            </div>

            <div className="space-y-4">
                {Object.keys(currExercises).length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-8">
                            <p className="text-gray-500">No exercises added yet. Click "Add New Exercise" to get started!</p>
                        </CardContent>
                    </Card>
                ) : (
                    Object.keys(currExercises).map((key) => (
                        <ExerciseCard
                            key={key}
                            exerciseName={key}
                            addNewSet={addNewSet}
                            sets={currExercises[key]}
                            sessionConfig={sessionConfig}
                        />
                    ))
                )}
            </div>

            <div className="mt-8">
                <HumanBody selected={selectedMuscleGroup || []} />
            </div>
        </div>
    );
}

export default CurrentWorkoutPage;
