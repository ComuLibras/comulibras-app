
import { ListTile } from "../../../components/list-tile";
import { useNavigate } from "react-router";
import { useGetCategories } from "../hooks/use-get-categories";
import { Header } from "../../../components/header";
import { SubHeader } from "../../../components/sub-header";
import { useState } from "react";
import { SearchedSentences } from "../../../components/searched-sentences";

export const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();

  const { categories } = useGetCategories();
  const [search, setSearch] = useState<string>("");

  return (
    <div className="p-4 space-y-4">
      <Header title="Categorias" placeholder="Pesquisar frases..." search={search} onSearchChange={setSearch} />
      <SearchedSentences search={search} />

      {search.trim().length === 0 && (
        <>
          <SubHeader title="Categorias" />
          <div className="flex flex-col gap-2">
            {categories.map((category) => (
              <ListTile 
                key={category.id}
                size="lg"
                category={category}  
                onClick={() => navigate(`/app/sentences/category/${category.id}`)}
                title={category.name}
                subtitle={`${category.sentenceCount} frases disponíveis`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
};