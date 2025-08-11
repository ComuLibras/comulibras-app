import PulsatingDots from "@/components/mvpblocks/pulsating-loader";
import { Button, type ButtonProps } from "./button";

type Props = ButtonProps & {
  isLoading: boolean;
}

export function LoadingButton({ isLoading, children, ...props }: Props) {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading ? <PulsatingDots variant={props.variant} /> : children} 
    </Button>
  );
}