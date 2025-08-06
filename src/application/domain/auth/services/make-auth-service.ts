import { AuthService } from "./auth-service";

export function makeAuthService() {
  return new AuthService();
}