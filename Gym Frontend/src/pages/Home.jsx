import { useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/common/button';
export default function Home() {
    const navigate = useNavigate();
    const { signOut } = useAuth();
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
        </div>
    );
}