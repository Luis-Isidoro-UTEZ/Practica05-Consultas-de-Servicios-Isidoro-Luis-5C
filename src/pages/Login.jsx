import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/authContext";
import Swal from "sweetalert2";
import '../css/Login.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    if (!username || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, ingresa tu usuario y contraseña.',
        confirmButtonColor: 'var(--md-primary)'
      });
      return;
    }

    setLoading(true);
    const success = await login(username, password);
    setLoading(false);

    if (success) {
      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Autenticación exitosa.',
        timer: 1500,
        showConfirmButton: false
      });
      navigate("/dashboard");
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error de acceso',
        text: 'Usuario o contraseña incorrectos.',
        confirmButtonColor: 'var(--md-primary)'
      });
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleLogin} className="card login-card">
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">
          Inicia sesión para gestionar usuarios
        </p>

        <div className="login-form-group">
          <Input
            label="Usuario"
            name="username"
            placeholder="ej: mor_2314"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="login-form-group">
          <Input
            label="Contraseña"
            name="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="login-button-container">
          <Button
            text={loading ? "Iniciando..." : "Iniciar Sesión"}
            type="primary"
            disabled={loading}
            className="w-full"
            style={{ width: '100%' }}
          />
        </div>

        <p className="login-footer">
          ¿No tienes cuenta? Usa las credenciales de prueba de FakeStoreAPI.
        </p>
      </form>
    </div>
  );
}

export default Login;
