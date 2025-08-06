
import { ListTile } from "../../../components/list-tile";
import { useNavigate } from "react-router";
import { useGetCategories } from "../hooks/use-get-categories";
import { Header } from "../../../components/header";
import { SubHeader } from "../../../components/sub-header";

export const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();

  const { categories } = useGetCategories();

  return (
    <div className="p-4">
      <Header title="Categorias" placeholder="Pesquisar frases..." />
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
    </div>
  )
};