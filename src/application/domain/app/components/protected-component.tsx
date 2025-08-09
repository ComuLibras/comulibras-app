import { useIsLoggedIn } from "../../auth/hooks/use-is-logged-in";

export function ProtectedComponent({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useIsLoggedIn();

  if (!isLoggedIn()) {
    return null;
  }

  return children;
}