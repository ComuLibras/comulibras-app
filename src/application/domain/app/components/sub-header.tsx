

import { Switch } from "@/application/shared/components/ui/switch";

type Props = {
  title: string;
}

export const SubHeader: React.FC<Props> = ({ title }) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-base font-bold">{title}</h3>
      <Switch />
    </div>
  )
};