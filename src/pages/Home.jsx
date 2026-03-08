import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/authContext";
import '../css/Home.css';

function Home() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const isLoggedIn = !!session;

  return (
    <div className="home-wrapper">
      <div className="card home-card">
        <h1 className="home-title">Practica 05</h1>
        <p className="home-description">
          Actividad de implementación de consultas de servicios
        </p>

        <div className="home-actions">
          {isLoggedIn ? (
            <Button
              text="Ir al Dashboard"
              type="primary"
              action={() => navigate("/dashboard")}
            />
          ) : (
            <Button
              text="Iniciar Sesión"
              type="primary"
              action={() => navigate("/login")}
            />
          )}
        </div>
      </div>

      <p style={{ marginTop: '32px', fontSize: '12px', color: 'var(--md-outline)' }}>
        Isidoro Ocampo Luis Haziel - 5°C DSM
      </p>
    </div>
  )
}

export default Home;