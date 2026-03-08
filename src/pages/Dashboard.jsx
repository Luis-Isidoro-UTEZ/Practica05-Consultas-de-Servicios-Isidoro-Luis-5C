import { useEffect, useState } from 'react';
import '../css/Dashboard.css';
import Profile from "./Profile";

function Dashboard() {
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        const checkUsers = async () => {
            let localData = localStorage.getItem('localUsers');
            if (!localData) {
                try {
                    const response = await fetch('https://fakestoreapi.com/users');
                    const data = await response.json();
                    localStorage.setItem('localUsers', JSON.stringify(data));
                    setUserCount(data.length);
                } catch (error) {
                    console.error("Error repopulating dashboard:", error);
                }
            } else {
                setUserCount(JSON.parse(localData).length);
            }
        };
        checkUsers();
    }, []);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Dashboard</h1>
            <div className="dashboard-grid">
                <Profile />
                <div className="stat-card">
                    <span className="stat-label">Usuarios Registrados</span>
                    <span className="stat-value">
                        {userCount}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;