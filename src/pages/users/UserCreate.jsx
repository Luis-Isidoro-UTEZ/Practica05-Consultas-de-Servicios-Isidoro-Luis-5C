import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Swal from 'sweetalert2'
import '../../css/UserStyles.css';

function UserCreate() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        email: '',
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        phone: ''
    })
    const [errors, setErrors] = useState({})
    const [isSaving, setIsSaving] = useState(false)

    const validate = () => {
        const newErrors = {}
        const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');

        if (!userData.firstname) newErrors.firstname = 'Nombre requerido'

        if (!userData.email) {
            newErrors.email = 'Email requerido'
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
            newErrors.email = 'Email inválido'
        } else if (localUsers.some(u => u.email === userData.email)) {
            newErrors.email = 'El correo ya está registrado'
        }

        if (!userData.username) {
            newErrors.username = 'Usuario requerido'
        } else if (localUsers.some(u => u.username === userData.username)) {
            newErrors.username = 'El nombre de usuario ya existe'
        }

        if (!userData.password) {
            newErrors.password = 'Contraseña requerida'
        } else if (userData.password.length < 8) {
            newErrors.password = 'Mínimo 8 caracteres'
        }

        if (!userData.phone) {
            newErrors.phone = 'Teléfono requerido'
        } else if (!/^\d{10}$/.test(userData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Debe tener exactamente 10 dígitos'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    }

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        if (!validate()) return;

        setIsSaving(true);
        try {
            await fetch('https://fakestoreapi.com/users', {
                method: "POST",
                body: JSON.stringify({
                    email: userData.email,
                    username: userData.username,
                    password: userData.password,
                    name: { firstname: userData.firstname, lastname: userData.lastname },
                    address: { city: 'Mexico', street: 'Reforma', number: 123, zipcode: '0000', geolocation: { lat: '0', long: '0' } },
                    phone: userData.phone
                })
            });

            let localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');

            if (localUsers.length === 0) {
                const response = await fetch('https://fakestoreapi.com/users');
                localUsers = await response.json();
            }

            const maxId = localUsers.length > 0 ? Math.max(...localUsers.map(u => u.id)) : 20;
            const newUser = {
                id: maxId + 1,
                ...userData,
                name: { firstname: userData.firstname, lastname: userData.lastname }
            };

            localStorage.setItem('localUsers', JSON.stringify([...localUsers, newUser]));

            Swal.fire({
                icon: 'success',
                title: 'Usuario Creado',
                text: 'El nuevo usuario se ha registrado correctamente.',
                timer: 2000,
                showConfirmButton: false
            });
            navigate('/users');
        } catch (error) {
            Swal.fire('Error', 'No se pudo crear el usuario', 'error');
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="user-form-container">
            <form onSubmit={handleSubmit} className="card user-form-card">
                <h2 className="user-list-title">Nuevo Usuario</h2>
                <p className="login-subtitle">
                    Registra un nuevo usuario en el sistema.
                </p>

                <div className="user-form-grid">
                    <Input label="Nombre" name="firstname" value={userData.firstname} onChange={handleChange} error={errors.firstname} required />
                    <Input label="Apellido" name="lastname" value={userData.lastname} onChange={handleChange} />
                </div>

                <div className="user-form-row">
                    <Input label="Email" name="email" type="email" value={userData.email} onChange={handleChange} error={errors.email} required />
                </div>

                <div className="user-form-grid">
                    <Input label="Nombre de Usuario" name="username" value={userData.username} onChange={handleChange} error={errors.username} required />
                    <Input label="Contraseña" name="password" type="password" value={userData.password} onChange={handleChange} error={errors.password} required />
                </div>

                <div className="user-form-row">
                    <Input
                        label="Teléfono"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                        required
                    />
                </div>

                <div className="user-form-actions">
                    <Button text="Cancelar" type="secondary" action={() => navigate('/users')} />
                    <Button text={isSaving ? "Guardando..." : "Guardar Usuario"} type="primary" action={handleSubmit} disabled={isSaving} />
                </div>
            </form>
        </div>
    )
}

export default UserCreate
