
import { makeAuthService } from "@/application/domain/auth/services/make-auth-service";
import { Navigate, Outlet } from "react-router";

export function AuthRoute() {
  const authService = makeAuthService();
  const { accessToken } = authService.getToken();

  if (accessToken) {
    return <Navigate to="/app/categories" replace />;
  }

  return <Outlet />;
}
