import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ActiveLogin = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoggedIn || user) {
    navigate(location.pathname);
  }
};

export default ActiveLogin;
