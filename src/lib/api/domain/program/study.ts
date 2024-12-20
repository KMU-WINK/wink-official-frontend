import WinkRequest from '@/api/request';
import { GetCategoriesResponse, GetStudiesResponse } from '@/api/type/domain/program/study';

export default class Study {
  constructor(private readonly request: WinkRequest) {}

  public async getStudies(page: number = 0, query: string = ''): Promise<GetStudiesResponse> {
    return this.request.get(`/program/study?page=${page}&query=${query}`);
  }

  public async getStudiesByCategory(
    category: string,
    page: number = 0,
    query: string = '',
  ): Promise<GetStudiesResponse> {
    return this.request.get(`/program/study/${category}?page=${page}&query=${query}`);
  }

  public async getCategories(): Promise<GetCategoriesResponse> {
    return this.request.get('/program/study/category');
  }
}
