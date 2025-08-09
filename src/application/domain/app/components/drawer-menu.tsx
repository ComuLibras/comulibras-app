import { Logo } from "@/application/shared/components/logo";
import { ThemeToggle } from "@/application/shared/components/theme/theme-toggle";
import { Button } from "@/application/shared/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/application/shared/components/ui/drawer";
import { Icon } from "@/application/shared/components/ui/icon";
import { MenuIcon, XIcon } from "lucide-react";
import { useLogOut } from "../../auth/hooks/use-log-out";

export const DrawerMenu = () => {
  const { logOut } = useLogOut();

  return (
    <Drawer direction="left">
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
      </DrawerContent>
    </Drawer>
  );
};