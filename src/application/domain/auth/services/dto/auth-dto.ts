
import z from 'zod';
export type Roles = 'ADMIN' | 'USER';

export const signInDTO = z.object({
  email: z.string().email({ message: 'E-mail inválido' }).min(1),
  password: z.string({ error: 'Senha é obrigatória' }).min(8, 'Senha deve ter mais que 8 caracteres'),
});

export type SignInDTO = z.infer<typeof signInDTO>;
export interface SignInResponse {
  accessToken: string;
  role: Roles
}


export interface Account {
  id: string;
  name: string;
  email: string;
  roleCode: Roles;
  createdAt: Date;
  updateAt: Date;
}

export interface MeResponse {
  account: Account;
}

export const signUpDTO = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email({ message: 'E-mail inválido' }).min(1),
  password: z.string({ error: 'Senha é obrigatória' }).min(8, 'Senha deve ter mais que 8 caracteres'),
  confirmPassword: z.string({ error: 'Confirmação de senha é obrigatória' }).min(8, 'Senha deve ter mais que 8 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

export type SignUpDTO = z.infer<typeof signUpDTO>;
export interface SignUpResponse {
  accessToken: string;
  role: Roles
}