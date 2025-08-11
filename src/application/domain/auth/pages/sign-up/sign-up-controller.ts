import { signUpDTO, type SignUpDTO } from "@/application/domain/auth/services/dto/auth-dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useSignUp } from "../../hooks/use-sign-up";

export function useSignUpController() {
  const { signUp } = useSignUp();
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
    signUp(dto);
  }

  return {
    form,
    handleSubmit,
    isValid,
    isSubmitted
  }
}
