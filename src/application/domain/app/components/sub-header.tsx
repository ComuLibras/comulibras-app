

import { HeartSwitch } from "@/application/shared/components/ui/heart-switch";
import { cn } from "@/application/shared/lib/utils";

type Props = {
  title: string;
  muted?: boolean;
  hideSwitch?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const SubHeader: React.FC<Props> = ({ title, muted = false, hideSwitch = false, checked, onCheckedChange }) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className={cn("text-base font-bold", muted && "text-muted-foreground font-normal")}>{title}</h3>
      {!hideSwitch && (
        <HeartSwitch checked={checked} onCheckedChange={onCheckedChange} />
      )}
    </div>
  )
};