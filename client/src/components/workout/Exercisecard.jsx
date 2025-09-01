import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../common/card.jsx"
import { Button } from "../common/button.jsx"
import { Input } from "../common/input.jsx"
import { Plus, X, Target, Weight } from "lucide-react"

function ExerciseCard(props) {
  const [newSet, setNewSet] = useState(false)
  const [newSetDetails, setNewSetDetails] = useState({
    reps: props.sessionConfig?.targetReps || "",
    weight: "",
  })

  function handleNewSet(event) {
    props.addNewSet(newSetDetails, props.exerciseName)
    setNewSetDetails({
      reps: props.sessionConfig?.targetReps || "",
      weight: "",
    })
    setNewSet(false)
    event.preventDefault()
  }

  function handleOnClick() {
    setNewSet(true)
  }

  function handleOnChange(event) {
    const name = event.target.name
    const value = event.target.value
    setNewSetDetails({ ...newSetDetails, [name]: value })
  }

  return (
    <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-700 hover:border-red-800 hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500">
      <CardHeader>
        <CardTitle className="text-lg flex items-center text-gray-600">
          <Target className="h-5 w-5 mr-2 text-red-500" />
          {props.exerciseName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="font-medium mb-3 flex items-center text-gray-500">
            <Weight className="h-4 w-4 mr-2 text-red-500" />
            Sets Completed:
          </h3>
          {props.sets.length === 0 ? (
            <div className="text-center py-6 bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-500">
              <Target className="h-8 w-8 text-gray-700 mx-auto mb-2" />
              <p className="text-gray-700 text-sm">No sets recorded yet</p>
              <p className="text-gray-700 text-xs">Add your first set below</p>
            </div>
          ) : (
            <div className="space-y-2">
              {props.sets.map((set) => (
                <div
                  key={set.sno}
                  className="flex justify-between items-center p-3 bg-red-400/20 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-all duration-300"
                >
                  <span className="font-semibold text-red-500">Set {set.sno}</span>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center text-gray-500">
                      <Target className="h-3 w-3 mr-1 text-red-500" />
                      {set.reps} reps
                    </span>
                    <span className="flex items-center text-gray-500">
                      <Weight className="h-3 w-3 mr-1 text-red-500" />
                      {set.weight} kg
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {newSet && (
          <form
            onSubmit={handleNewSet}
            className="space-y-4 p-4 bg-red-500/20 rounded-lg border border-red-500/30 animate-slide-up"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-red-500">Add New Set</h4>
              <button
                type="button"
                onClick={() => setNewSet(false)}
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-500">
                  <Target className="h-3 w-3 inline mr-1 text-red-500" />
                  Reps:
                </label>
                <Input
                  name="reps"
                  type="number"
                  onChange={handleOnChange}
                  value={newSetDetails.reps}
                  placeholder={"Enter reps"}
                  required
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-500">
                  <Weight className="h-3 w-3 inline mr-1 text-red-500" />
                  Weight (kg):
                </label>
                <Input
                  name="weight"
                  type="number"
                  step="0.5"
                  onChange={handleOnChange}
                  value={newSetDetails.weight}
                  placeholder="Enter weight"
                  required
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Set
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setNewSet(false)}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 hover:text-gray-300 bg-transparent"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        )}

        {!newSet && (
          <Button
            onClick={handleOnClick}
            variant="outline"
            className="w-full mt-4 border-red-600 text-red-500 hover:bg-red-500/20 hover:border-red-400 transition-all duration-200 bg-transparent"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Set
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default ExerciseCard
