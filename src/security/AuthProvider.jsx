import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";


function AuthProvider({ children }) {
    const [session, setSession] = useState(null)

    useEffect(() => {
        const session = localStorage.getItem("session")
        if (session) {
            setSession(JSON.parse(session))
        }
    }, [])

    const login = async (username, password) => {
        try {
            const response = await fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.token) {
                console.log('Autenticación exitosa:', data.token);
                const sessionData = { username, token: data.token };
                setSession(sessionData);
                localStorage.setItem("session", JSON.stringify(sessionData));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error al autenticar:', error);
            return false;
        }
    }

    const logout = () => {
        localStorage.removeItem("session")
        setSession(null)
    }

    return (
        <AuthContext.Provider value={{
            session, login, logout,
            isLoggedIn: !!session
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
