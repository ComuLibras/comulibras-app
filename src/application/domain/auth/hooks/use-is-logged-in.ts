import { useCallback } from "react";
import { makeAuthService } from "../services/make-auth-service";

export function useIsLoggedIn() {
  const authService = makeAuthService();

  const isLoggedIn = useCallback(() => {
    return authService.isLoggedIn();
  }, [authService]);

  return {
    isLoggedIn,
  };
}