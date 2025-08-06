
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/application/shared/components/ui/form";
import { Input } from "@/application/shared/components/ui/input";
import { PasswordInput } from "@/application/shared/components/ui/password-input";
import { FormContainer, FormSubtitle, FormWrapper } from '../../components/form';
import { useSignInController } from "./sign-in-controller";
import { Icon } from "@/application/shared/components/ui/icon";
import { Link } from "react-router";
import { Button } from "@/application/shared/components/ui/button";
import { Separator } from "@/application/shared/components/ui/separator";

import Google from '@/application/assets/google.svg';

export const SignInPage: React.FC = () => {
  const { form, handleSubmit, isSubmitted, isValid } = useSignInController();

  return (
    <FormContainer>
      <Form {...form}>
        <Button type="submit" disabled={!isValid && isSubmitted} variant='outline' size="lg" className="w-full mb-6">
          <img src={Google} alt="Google" className="w-8 h-8 mr-2" />
          Entrar com Google
        </Button>

        <div className="flex items-center justify-center gap-2 w-full px-10">
          <Separator className="flex-1 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Ou</span>
          <Separator className="flex-1" />
        </div>

        <FormWrapper
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="example@gmail.com" 
                    type="email"
                    leftIcon={<Icon name="mail" />} 
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <PasswordInput 
                    {...field} 
                    placeholder="******" 
                    className="h-12"
                  />
                </FormControl>
                <div className="flex justify-end">
                  <Link className="text-right text-xs underline underline-offset-2" to="/auth/forgot-password">Esqueceu sua senha?</Link>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-6 mt-6 justify-center items-center">
            <Button type="submit" disabled={!isValid && isSubmitted} className="w-full" size="lg">
              Entrar
            </Button>

            <FormSubtitle
              text="Não tem uma conta?"
              span="Cadastre-se"
              to="/auth/sign-up"
            />
          </div>
        </FormWrapper>
      </Form>
    </FormContainer>
  );
};
