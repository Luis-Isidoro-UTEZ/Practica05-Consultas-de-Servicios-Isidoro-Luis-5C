import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import '../../css/UserStyles.css';

function UserFindOne() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
        const localFound = localUsers.find(u => u.id === parseInt(id));

        if (localFound) {
          setUser(localFound);
        } else {
          const response = await fetch(`https://fakestoreapi.com/users/${id}`);
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser()
  }, [id])

  if (loading) return <div className="card text-center">Obteniendo detalles...</div>

  if (!user) return (
    <div className="card text-center">
      <h2>Usuario no encontrado</h2>
      <Button text="Volver a la lista" type="primary" action={() => navigate('/users')} />
    </div>
  )

  return (
    <div className="user-form-container">
      <div className="card user-form-card">
        <div className="user-list-header">
          <h2 className="user-list-title">Ficha de Usuario</h2>
          <div className="user-details-id">
            ID: {user.id}
          </div>
        </div>

        <div className="user-details-divider" />

        <div className="user-details-grid">
          <div className="user-details-info-group">
            <span className="input-label">Nombre Completo</span>
            <p className="stat-value" style={{ margin: '8px 0 0 0', fontSize: '18px' }}>
              {user.name.firstname} {user.name.lastname}
            </p>

            <div style={{ marginTop: '20px' }}>
              <span className="input-label">Username</span>
              <p className="navbar-username" style={{ margin: '8px 0 0 0', color: 'var(--md-primary)' }}>@{user.username}</p>
            </div>
          </div>
          <div className="user-details-info-group">
            <span className="input-label">Correo Electrónico</span>
            <p className="stat-value" style={{ margin: '8px 0 0 0', fontSize: '16px' }}>{user.email}</p>

            <div style={{ marginTop: '20px' }}>
              <span className="input-label">Teléfono</span>
              <p className="navbar-username" style={{ margin: '8px 0 0 0' }}>{user.phone || 'N/A'}</p>
            </div>
          </div>
        </div>

        {user.address && (
          <div className="user-details-address-box">
            <span className="input-label">Dirección Registrada</span>
            <p className="token-value" style={{ fontSize: '14px', whiteSpace: 'normal', height: 'auto' }}>
              {user.address.street} {user.address.number}, {user.address.city} ({user.address.zipcode})
            </p>
          </div>
        )}

        <div className="user-form-actions">
          <Button text="Volver a la lista" type="secondary" action={() => navigate('/users')} />
        </div>
      </div>
    </div>
  )
}

export default UserFindOne