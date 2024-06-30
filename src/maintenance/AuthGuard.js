import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const AuthGuard = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate("/auth/login", {
        state: {
          from: location.pathname,
        },
        replace: true,
      });
    } else {
      navigate(location.pathname);
    }
  }, [isLoggedIn]);

  return children;
};

export default AuthGuard;
