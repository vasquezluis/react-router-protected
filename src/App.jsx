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
        <Route index element={<Index />}></Route>
        <Route path="/landing" element={<Index />}></Route>
        // ruta protegida por protectedRoute
        <Route
          path="/home"
          element={
            <ProtectedRoute user={user} redirecTo="/">
              {" "}
              <UserHome />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/analytics" element={<Analytics />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
