import { cn } from "@/application/shared/lib/utils";

type Props = {
  className?: string;
}

export default function ModifiedClassicLoader({ className }: Props = { className: '' }) {
  return (
    <div className={cn("border-white dark:border-primary ml-3 h-10 w-10 animate-spin rounded-full border-t-2 border-b-2 ease-linear", className)}></div>
  );
}
