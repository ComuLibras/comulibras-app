import { ApiService } from "@/application/shared/services/api-service";
import type {
  GetSentenceResponse,
  GetSentencesResponse, UpdateSentenceFavoriteBody,
  UpdateSentenceFavoriteResponse
} from "./dto/sentences-dto";

export class SentencesService extends ApiService {
  private readonly baseUrl: string

  constructor(
  ) {
    super();
    this.baseUrl = '/sentences'
  }

  async getSentences(categoryId: string) {
    const data = await this.httpClient.get<GetSentencesResponse>(this.baseUrl, {
      params: {
        categoryId,
      }
    });

    return {
      data: data.data.sentences,
      total: data.data.totalSentences,
    }
  }

  async getSentence(sentenceId: string) {
    return this.httpClient.get<GetSentenceResponse>(`${this.baseUrl}/${sentenceId}`);
  }

  async updateSentenceFavorite(dto: UpdateSentenceFavoriteBody, sentenceId: string) {
    return this.httpClient.patch<UpdateSentenceFavoriteResponse>(`${this.baseUrl}/${sentenceId}/favorite`, dto);
  }
}
