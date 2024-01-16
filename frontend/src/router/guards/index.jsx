import { Navigate } from "react-router-dom";
import { getToken } from "../../utils/token";

export const GuardUser = ({ children }) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export const GuardAuth = ({ children }) => {
  const token = getToken();

  if (token) {
    return <Navigate to="/" />;
  }

  return children;
};
