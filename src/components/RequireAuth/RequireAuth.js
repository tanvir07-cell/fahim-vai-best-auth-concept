import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebase.init";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  console.log(user);

  // login kore generator component e jaooar pore jate loading korle ar login component e jate nah ase sei jonne loading hooks ti deoaa:
  if (loading) {
    return <p className="flex justify-center items-center">Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  } else return children;
};

export default RequireAuth;
