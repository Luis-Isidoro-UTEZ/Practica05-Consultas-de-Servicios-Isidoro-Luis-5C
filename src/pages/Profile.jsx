import { useAuth } from "../security/authContext";
import '../css/Dashboard.css';

function Profile() {
  const { session } = useAuth();

  return (
    <div className="stat-card stat-card-profile">
      <span className="stat-label">Sesión Activa</span>
      <span className="stat-value">
        {session?.username || 'Invitado'}
      </span>
      <div className="profile-footer">
        <span className="token-label">Token de Acceso</span>
        <p className="token-value">
          {session?.token || 'No disponible'}
        </p>
      </div>
    </div>
  );
}

export default Profile;