import React,{useState} from "react";
import { Card, CardContent, CardHeader, CardTitle } from '../common/card';
import { Button } from '../common/button';
import { Input } from '../common/input';

//exercise object is {name:"",set:[]}

//props will contain exercise obect we will just new set to 
function ExerciseCard(props){   
    const [newSet, setNewSet] = useState(false)
    const [newSetDetails, setNewSetDetails] = useState({ 
        reps: props.sessionConfig?.targetReps || "", 
        weight: "" 
    });

    function handleNewSet(event) {
        props.addNewSet(newSetDetails,props.exerciseName);
        setNewSetDetails({
            reps: props.sessionConfig?.targetReps || "",
            weight: ""
        });
        setNewSet(false);
        event.preventDefault();
    }
    
    function handleOnClick() {
        setNewSet(true);
    }
    
    function handleOnChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setNewSetDetails({ ...newSetDetails, [name]: value });
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">{props.exerciseName}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <h3 className="font-medium mb-2">Sets:</h3>
                    {props.sets.length === 0 ? (
                        <p className="text-gray-500 text-sm">No sets recorded yet</p>
                    ) : (
                        <div className="space-y-1">
                            {props.sets.map((set) => (
                                <div key={set.sno} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                    <span className="font-medium">Set {set.sno}: </span>
                                    <span> Reps={set.reps} & Weight={set.weight} kg</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {newSet && (
                    <form onSubmit={handleNewSet} className="space-y-3 p-3 bg-purple-50 rounded-lg">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium mb-1">Reps:</label>
                                <Input
                                    name="reps"
                                    type="number"
                                    onChange={handleOnChange} 
                                    value={newSetDetails.reps} 
                                    placeholder={props.sessionConfig?.targetReps || "Enter reps"}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Weight (kg):</label>
                                <Input
                                    name="weight"
                                    type="number"
                                    step="0.5"
                                    onChange={handleOnChange}
                                    value={newSetDetails.weight}
                                    placeholder="Enter weight"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" size="sm">
                                Add Set
                            </Button>
                            <Button 
                                type="button" 
                                variant="outline" 
                                size="sm"
                                onClick={() => setNewSet(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                )}

                <Button 
                    onClick={handleOnClick}
                    variant="outline"
                    className="w-full mt-3"
                >
                    {newSet ? 'Adding Set...' : 'Add New Set'}
                </Button>
            </CardContent>
        </Card>
    );
}

export default ExerciseCard;