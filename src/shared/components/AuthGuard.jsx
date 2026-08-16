import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAccessToken, getRefreshToken } from "../auth/auth";

function AuthGuard() {
  const location = useLocation();
  
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!accessToken && !refreshToken) {
    return <Navigate to="/signIn" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default AuthGuard;
