import { useSignIn } from "@/application/domain/auth/hooks/use-sign-in";
import { signUpDTO, type SignUpDTO } from "@/application/domain/auth/services/dto/auth-dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

export function useSignUpController() {
  const { signIn } = useSignIn();
  const form = useForm<SignUpDTO>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(signUpDTO)
  });

  const { formState: { isValid, isSubmitted } } = form;

  const handleSubmit: SubmitHandler<SignUpDTO> = async (dto) => {
    signIn(dto);
  }

  return {
    form,
    handleSubmit,
    isValid,
    isSubmitted
  }
}
