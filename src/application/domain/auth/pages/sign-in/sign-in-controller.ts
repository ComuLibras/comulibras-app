import { useSignIn } from "@/application/domain/auth/hooks/use-sign-in";
import { type SignInDTO, signInDTO } from "@/application/domain/auth/services/dto/auth-dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

export function useSignInController() {
  const { signIn } = useSignIn();
  const form = useForm<SignInDTO>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(signInDTO)
  });

  const { formState: { isValid, isSubmitted } } = form;

  const handleSubmit: SubmitHandler<SignInDTO> = async (dto) => {
    signIn(dto);
  }

  return {
    form,
    handleSubmit,
    isValid,
    isSubmitted
  }
}
