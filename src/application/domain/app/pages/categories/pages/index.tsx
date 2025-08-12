
import { ListTile } from "../../../components/list-tile";
import { useNavigate } from "react-router";
import { useGetCategories } from "../hooks/use-get-categories";
import { Header } from "../../../components/header";
import { SubHeader } from "../../../components/sub-header";
import { useState } from "react";
import { SearchedSentences } from "../../../components/searched-sentences";
import ListTileLoading from "../../../components/list-tile-loading";
import PullToRefresh from 'react-simple-pull-to-refresh';

export const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(undefined);
  const { categories, isLoading, refresh } = useGetCategories({ isFavorite });
  const [search, setSearch] = useState<string>("");

  return (
    <PullToRefresh onRefresh={refresh} pullingContent="">
      <div className="p-4 space-y-4 h-dvh">
        <Header title="Categorias" placeholder="Pesquisar frases..." search={search} onSearchChange={setSearch} />
        <SearchedSentences search={search} isFavorite={isFavorite} />

        {search.trim().length === 0 && (
          <>
            <SubHeader
              title="Categorias"
              checked={Boolean(isFavorite)}
              onCheckedChange={(checked) => setIsFavorite(checked ? true : undefined)}
            />
            {isLoading && <ListTileLoading length={10} />}

            {categories.length === 0 && <div className="text-center text-sm text-gray-500">Nenhuma categoria encontrada</div>}
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <ListTile 
                  key={category.id}
                  size="lg"
                  categoryId={category.id}
                  color={category.color}
                  icon={category.icon}
                  onClick={() => navigate(`/app/sentences/category/${category.id}`, {
                    state: {
                      categoryName: category.name,
                      categoryId: category.id,
                    },
                  })}
                  title={category.name}
                  subtitle={`${category.sentenceCount} frases disponíveis`}
                  isFavorite={category.isFavorite}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </PullToRefresh>
  )
};