import * as React from "react";
import { Input } from "./input";
import { Icon } from "./icon";

type PasswordInputProps = Omit<React.ComponentProps<typeof Input>, "type" | "leftIcon" | "rightIcon">;

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = React.useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Input
      {...props}
      type={showPassword ? "text" : "password"}
      leftIcon={<Icon name="lock" />}
      rightIcon={
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-sm hover:bg-accent"
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          <Icon name={showPassword ? "eye" : "eye-closed"} />
        </button>
      }
    />
  )
}