import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import AdminDashboard from "./pages/AdminDashboard";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? "/tasks" : "/login"} replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" replace />} />
        <Route path="/tasks" element={user ? <Tasks /> : <Navigate to="/login" replace />} />
        <Route
          path="/admin"
          element={
            user && user.role === "admin"
              ? <AdminDashboard />
              : <Navigate to="/tasks" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;