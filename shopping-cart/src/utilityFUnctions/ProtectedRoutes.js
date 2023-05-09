import { useContext } from "react";
import counterContext from "../Hooks/Context";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const { user } = useContext(counterContext);
  const location = useLocation();

  return (
    <div>
        {console.log(user)}
      {user.username ? (
        children
      ) : (
        <Navigate to="/login" state={{ path: location.pathname }} replace/>
      )}
    </div>
  );
}

export default ProtectedRoutes;
