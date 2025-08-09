import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeSentencesService } from "../pages/sentences/services/make-sentences-service";

type Props = {
  search: string;
  categoryId?: string;
  debounceMs?: number;
};

export function useGetSentencesBySearch({ search, categoryId, debounceMs = 400 }: Props) {
  const sentencesService = makeSentencesService();

  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedSearch(search), debounceMs);
    return () => clearTimeout(handle);
  }, [search, debounceMs]);

  const enabled = useMemo(() => debouncedSearch.trim().length > 0, [debouncedSearch]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["sentences", "search", debouncedSearch, categoryId ?? null],
    queryFn: () => sentencesService.getSentences({ categoryId, search: debouncedSearch }),
    enabled,
  });

  return { sentences: data?.data ?? [], total: data?.total ?? 0, isLoading: isLoading || isFetching };
}