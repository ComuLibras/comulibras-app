import { Colors } from "@/application/domain/app/components/colors-map";
import type { Category } from "@/application/domain/app/pages/categories/services/dto/categories-dto";

export const emptyCategory: Category = {
  id: '1',
  name: 'Sem Categoria',
  color: Colors.Azul,
  icon: 'home',
  isActive: true,
  sentenceCount: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
}