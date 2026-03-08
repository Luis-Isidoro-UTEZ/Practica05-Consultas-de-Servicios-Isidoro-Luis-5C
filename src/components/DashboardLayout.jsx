import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../security/authContext';
import Button from './Button';
import '../css/Navbar.css';

function DashboardLayout() {
    const { logout, session } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="layout-wrapper">
            <nav className="navbar">
                <div className="navbar-content">
                    <span className="navbar-title" onClick={() => navigate('/dashboard')}>
                        FakeStore Admin
                    </span>
                    <Button
                        text="Dashboard"
                        action={() => navigate('/dashboard')}
                        className="nav-btn-secondary"
                    />
                    <Button
                        text="Usuarios"
                        action={() => navigate('/users')}
                        className="nav-btn-secondary"
                    />
                </div>
                <div className="navbar-user-info">
                    <span className="navbar-username">
                        {session?.username}
                    </span>
                    <Button
                        text="Cerrar Sesión"
                        type="danger"
                        action={logout}
                        className="nav-btn-logout"
                    />
                </div>
            </nav>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}

export default DashboardLayout;
