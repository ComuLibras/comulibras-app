
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/application/shared/components/ui/form";
import { Input } from "@/application/shared/components/ui/input";
import { PasswordInput } from "@/application/shared/components/ui/password-input";
import { FormContainer, FormSubtitle, FormWrapper } from '../../components/form';
import { useSignUpController } from "./sign-up-controller";
import { Icon } from "@/application/shared/components/ui/icon";
import { Button } from "@/application/shared/components/ui/button";
import ModifiedClassicLoader from "@/components/mvpblocks/modified-classic-loader";


export const SignUpPage: React.FC = () => {
  const { form, handleSubmit, isSubmitted, isValid, isLoading } = useSignUpController();

  return (
    <FormContainer>
      <Form {...form}>
        <FormWrapper
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Nome completo" 
                    leftIcon={<Icon name="user" />} 
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    autoComplete="off"
                    placeholder="example@gmail.com" 
                    leftIcon={<Icon name="mail" />} 
                    className="h-12"
                    type="email"
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
                    autoComplete="new-password"
                    placeholder="******" 
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <PasswordInput 
                    {...field} 
                    autoComplete="new-password"
                    placeholder="******" 
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-2 mt-6 justify-center items-center">
            <Button type="submit" disabled={!isValid && isSubmitted || isLoading} className="w-full" size="lg">
              Criar conta
              {isLoading && <ModifiedClassicLoader />}
            </Button>

            <FormSubtitle
              text="Já tem uma conta?"
              span="Entrar"
              to="/auth/sign-in"
            />
          </div>
        </FormWrapper>
      </Form>
    </FormContainer>
  );
};
