

import { Switch } from "@/application/shared/components/ui/switch";
import { cn } from "@/application/shared/lib/utils";

type Props = {
  title: string;
  muted?: boolean;
}

export const SubHeader: React.FC<Props> = ({ title, muted = false }) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className={cn("text-base font-bold", muted && "text-muted-foreground font-normal")}>{title}</h3>
      <Switch />
    </div>
  )
};