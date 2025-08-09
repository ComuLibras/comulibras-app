import { ApiService } from "@/application/shared/services/api-service";
import { type GetCategoriesResponse, type UpdateCategoryFavoriteBody, type UpdateCategoryFavoriteResponse } from "./dto/categories-dto";


export class CategoriesService extends ApiService {
  private readonly baseUrl: string

  constructor(
  ) {
    super();
    this.baseUrl = '/categories'
  }

  async getCategories(params?: { isFavorite?: boolean }) {
    return this.httpClient.get<GetCategoriesResponse>(this.baseUrl, {
      params: {
        isFavorite: params?.isFavorite,
      }
    });
  }

  async updateCategoryFavorite(dto: UpdateCategoryFavoriteBody, categoryId: string) {
    return this.httpClient.patch<UpdateCategoryFavoriteResponse>(`${this.baseUrl}/${categoryId}/favorite`, dto);
  }
}
