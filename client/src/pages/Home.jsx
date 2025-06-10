import { useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/common/button';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const navigate = useNavigate();
    const { signOut, user } = useAuth();
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        async function fetchSessions() {
            try {
                const response = await axios.get("http://localhost:3001/api/exercises/my", {
                    withCredentials: true
                });
                setSessions(response.data.exercises);
            } catch (error) {
                console.error("Failed to fetch sessions", error);
            }
        }
        if (user) fetchSessions();
    }, [user]);

    return (
        <div>
            <button onClick={() => navigate('/newSession')}>Start A Workout Session</button>
            <div className="border-b border-t border-purple-100 p-4 bg-white">
                <Button
                    onClick={() => signOut()}
                    variant="outline"
                    className="w-full"
                >
                    Sign Out
                </Button>
            </div>
            <h2>Your Previous Sessions:</h2>
            <ul>
                {sessions.map((session, idx) => (
                    <li key={idx} style={{marginBottom: '1.5em'}}>
                        <strong>{session.sessionConfig?.sessionName || "Session"}</strong>
                        <div>Date: {new Date(session.date).toLocaleString()}</div>
                        <div>Type: {session.sessionConfig?.workoutType || 'N/A'}</div>
                        <div>Duration: {session.sessionConfig?.duration ? `${session.sessionConfig.duration} min` : 'N/A'}</div>
                        <div>Exercises: {Object.keys(session.data || {}).join(", ")}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}