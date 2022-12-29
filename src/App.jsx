import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Index from "./pages/public/Index";
import UserHome from "./pages/private/UserHome";
import Dashboard from "./pages/private/Dashboard";
import Analytics from "./pages/private/Analytics";
import Admin from "./pages/private/Admin";
import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);

  const login = () => {
    // request done
    setUser({
      id: 1,
      name: "john",
      permission: ["analize"],
      roles: ["normal"],
    });
  };

  const logout = () => setUser(null);

  return (
    <BrowserRouter>
      <Navbar />

      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}

      <Routes>
        <Route index element={<Index />} />
        <Route path="/landing" element={<Index />} />
        // ruta protegida por protectedRoute | outlet
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="/home" element={<UserHome />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        // ruta protegida por protectedRoute | children
        <Route
          path="/analytics"
          element={
            <ProtectedRoute
              isAllowed={!!user && user.permission.includes("analize")}
              redirecTo="/home"
            >
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAllowed={!!user && user.roles.includes("admin")}
              redirecTo="/home"
            >
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
