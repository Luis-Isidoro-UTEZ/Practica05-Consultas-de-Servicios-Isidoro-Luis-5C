import './css/App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Error404 from "./pages/Error404";

import UserFindOne from "./pages/users/UserFindOne";
import UserList from "./pages/users/UserList";
import UserCreate from "./pages/users/UserCreate";

import ProtectedRoutes from "./routes/ProtectedRoutes";
import { useAuth } from "./security/authContext";
import DashboardLayout from "./components/DashboardLayout";

function App() {
  const { session } = useAuth();
  const isLoggedIn = !!session;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
      />

      <Route element={<ProtectedRoutes isAllowed={isLoggedIn} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/new" element={<UserCreate />} />
          <Route path="/users/:id" element={<UserFindOne />} />
        </Route>
      </Route>

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;