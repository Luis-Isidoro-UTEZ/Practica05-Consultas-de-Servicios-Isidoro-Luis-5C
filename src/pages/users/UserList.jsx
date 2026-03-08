import { useEffect, useState } from "react";
import Button from "../../components/Button";
import DataTable from "../../components/DataTable";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../../css/UserStyles.css';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getUsers = async () => {
        setLoading(true);
        try {
            const localUsers = localStorage.getItem('localUsers');
            let data = [];
            if (localUsers) {
                data = JSON.parse(localUsers);
            } else {
                const response = await fetch('https://fakestoreapi.com/users');
                data = await response.json();
                localStorage.setItem('localUsers', JSON.stringify(data));
            }
            data.sort((a, b) => a.id - b.id);
            setUsers(data);
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar los usuarios', 'error');
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        const result = await Swal.fire({
            title: '¿Eliminar usuario?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--md-primary)',
            cancelButtonColor: 'var(--md-error)',
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await fetch(`https://fakestoreapi.com/users/${id}`, { method: "DELETE" });
                const updatedUsers = users.filter(u => u.id !== id);
                setUsers(updatedUsers);
                localStorage.setItem('localUsers', JSON.stringify(updatedUsers));
                Swal.fire('¡Borrado!', 'Usuario eliminado correctamente.', 'success');
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
            }
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const renderActions = (user) => (
        <div className="action-buttons">
            <Button
                text="Ver"
                type="secondary"
                action={() => navigate(`/users/${user.id}`)}
                className="action-btn"
            />
            <Button
                text="Borrar"
                type="danger"
                action={() => deleteUser(user.id)}
                className="action-btn"
            />
        </div>
    );

    if (loading) return <div className="card text-center">Cargando usuarios...</div>;

    return (
        <div className="card m-0">
            <div className="user-list-header">
                <h2 className="user-list-title">Gestión de Usuarios</h2>
                <Button
                    text="+ Crear Usuario"
                    type="primary"
                    action={() => navigate("/users/new")}
                />
            </div>

            <DataTable
                headers={['ID', 'Nombre Completo', 'Email', 'Teléfono']}
                data={users.map(u => ({
                    id: u.id,
                    name: u.name,
                    email: u.email,
                    phone: u.phone
                }))}
                renderActions={renderActions}
            />

            {users.length === 0 && (
                <div className="empty-state">
                    No se encontraron usuarios registrados.
                </div>
            )}
        </div>
    );
}

export default UserList;