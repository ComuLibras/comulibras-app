import { Logo } from "@/application/shared/components/logo";
import { ThemeToggle } from "@/application/shared/components/theme/theme-toggle";
import { Button } from "@/application/shared/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/application/shared/components/ui/drawer";
import { Icon } from "@/application/shared/components/ui/icon";
import { MenuIcon, XIcon } from "lucide-react";
import { useLogOut } from "../../auth/hooks/use-log-out";
import { useIsLoggedIn } from "../../auth/hooks/use-is-logged-in";
import { useState } from "react";
import { useNavigate } from "react-router";

export const DrawerMenu = () => {
  const { logOut } = useLogOut();
  const { isLoggedIn } = useIsLoggedIn();

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>
        <MenuIcon />
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <Logo className="size-24" />

            <DrawerClose>
              <XIcon />
            </DrawerClose>
          </div>
        </DrawerHeader>

        {isLoggedIn() && (
          <>
            <div className="flex flex-col gap-4 h-full">
              <Button variant="ghost" className="flex items-center justify-start gap-2">
                <Icon name="home" />
                Meus Dados
              </Button>
    
              <ThemeToggle />
            </div>
    
            <DrawerFooter>
              <Button variant="ghost" className="flex items-center justify-start gap-2" onClick={logOut}>
                <Icon name="log-out" />
                Encerrar sessão
              </Button>
            </DrawerFooter>
            </>
        )}

        {!isLoggedIn() && (
         <div className="flex flex-col px-6 h-full justify-start">
          <div className="flex items-center mb-6 flex-col gap-1 w-full justify-center">
            <div className="max-w-[300px] flex flex-col gap-1 items-center text-center">
              <h1 className="text-xl font-bold">Bem-vindo(a)!</h1>
              <p className="text-base text-muted-foreground">Crie ou acesse sua conta para salvar as suas frases mais usadas.</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button className="w-full" size="lg" onClick={() => navigate('/auth/sign-in')}>
              Acessar minha conta
            </Button>

            <Button className="w-full" variant="ghost" size="lg" onClick={() => setIsOpen(false)}>
              Continuar como visitante
            </Button>
          </div>
         </div>
        )}
        </DrawerContent>
    </Drawer>
  );
};