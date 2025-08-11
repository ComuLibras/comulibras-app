import { Skeleton } from "@/application/shared/components/ui/skeleton";

type Props = {
  length?: number;
}

export default function ListTileLoading({ length = 1 }: Props = { length: 1 }) {

  return (
    <div className="flex flex-col gap-2 w-full">
      {Array.from({ length }).map((_, index) => (
        <Skeleton key={index} className="h-16 w-full"></Skeleton>
      ))}
    </div>
  );
}