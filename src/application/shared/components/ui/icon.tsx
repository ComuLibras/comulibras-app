import { DynamicIcon } from "lucide-react/dynamic"

export type IconProps = React.ComponentProps<typeof DynamicIcon>

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  return <DynamicIcon size={16} name={name}  {...props} />
}