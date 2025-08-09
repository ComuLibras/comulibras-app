import { useCallback } from "react";
import { makeAuthService } from "../services/make-auth-service";

export function useLogOut() {
  const authService = makeAuthService();

  const logOut = useCallback(() => {
    authService.logout({ shallRedirect: true });
  }, [authService]);

  return {
    logOut,
  };
}