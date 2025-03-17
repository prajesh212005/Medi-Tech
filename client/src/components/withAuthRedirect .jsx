import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/userContext";

const withAuthRedirect = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useUser();

    useEffect(() => {
      const currentPath = location.pathname;

      if (user === null) {
        // If not authenticated and not already on the signin page, redirect to signin
        if (currentPath !== "/login") {
          navigate("/login", { replace: true });
        }
      } else {
        // Logic for redirection based on role and current route
        if (user.role === "patient" && !currentPath.startsWith("/patient")) {
          navigate("/patient", { replace: true });
        } else if (
          user.role === "doctor" &&
          !currentPath.startsWith("/doctor")
        ) {
          navigate("/doctor", { replace: true });
        } else if (
          user.role === "receptionist" &&
          !currentPath.startsWith("/receptionist")
        ) {
          navigate("/receptionist", { replace: true });
        }
      }
    }, [user.role, navigate, location]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuthRedirect;
