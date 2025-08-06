import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { makeAuthService } from "../services/make-auth-service";
import type { SignUpDTO, SignUpResponse } from "../services/dto/auth-dto";

export function useSignUp() {
  const authService = makeAuthService();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation<AxiosResponse<SignUpResponse>, Error, SignUpDTO>({
    mutationFn: authService.signUp.bind(authService),
    onSuccess: (response) => {
      const { accessToken, role } = response.data;
      authService.setToken({ accessToken, role });

      const entryRoute = '/dashboard';

      navigate(entryRoute);
      toast.success('Conta criada com sucesso');
    },
    onError: () => toast.error('Erro ao criar conta')
  });

  return {
    signUp: mutateAsync,
    isLoading: isPending,
  }
}
