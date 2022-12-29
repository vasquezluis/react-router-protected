import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, user, redirecTo = "/landing" }) {
  if (!user) return <Navigate to={redirecTo} />;

  console.log(user);

  return children;
}

export default ProtectedRoute;
