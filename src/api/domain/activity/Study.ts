import { WinkApiRequest } from '@/api';

export class Study {
  constructor(private readonly request: WinkApiRequest) {}

  public async getCategories(): Promise<GetCategoriesResponseDto> {
    return this.request.get('/activity/study/category');
  }

  public async getStudiesPage(): Promise<GetStudiesPageResponse> {
    return this.request.get('/activity/study/max');
  }

  public async getStudies(data: GetStudiesRequestDto): Promise<GetStudiesResponse> {
    return this.request.get('/activity/study?page=' + data.page);
  }

  public async searchStudies(data: SearchStudiesRequestDto): Promise<GetStudiesResponse> {
    return this.request.get('/activity/study/search?query=' + data.query);
  }
}

export class StudyAdmin {
  constructor(private readonly request: WinkApiRequest) {}

  public async createCategory(data: CreateCategoryRequestDto): Promise<CreateCategoryResponseDto> {
    return this.request.put('/admin/activity/study/category', data);
  }

  public async updateCategory(data: UpdateCategoryRequestDto): Promise<void> {
    return this.request.patch('/admin/activity/study/category', data);
  }

  public async deleteCategory(data: DeleteCategoryRequestDto): Promise<void> {
    return this.request.delete('/admin/activity/study/category', data);
  }

  public async createStudy(data: CreateStudyRequestDto): Promise<CreateStudyResponseDto> {
    return this.request.put('/admin/activity/study', data);
  }

  public async deleteStudy(data: DeleteStudyRequestDto): Promise<void> {
    return this.request.delete('/admin/activity/study', data);
  }
}

//////////////////////////////////////////////////////////////////////////

export interface CreateCategoryRequestDto {
  category: string;
}

export interface CreateStudyRequestDto {
  link: string;
}

export interface DeleteCategoryRequestDto {
  categoryId: string;
}

export interface DeleteStudyRequestDto {
  studyId: string;
}

export interface UpdateCategoryRequestDto {
  categoryId: string;
  category: string;
}

export interface GetStudiesRequestDto {
  page: number;
}

export interface SearchStudiesRequestDto {
  query: string;
}

//////////////////////////////////////////////////////////////////////////

export interface CreateCategoryResponseDto {
  category: Category;
}

export interface CreateStudyResponseDto {
  study: StudyType;
}

export interface GetCategoriesResponseDto {
  categories: Category[];
}

export interface GetStudiesResponse {
  studies: StudyType[];
}

export interface GetStudiesPageResponse {
  page: number;
}

//////////////////////////////////////////////////////////////////////////

export interface StudyType {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  type: 'Project' | 'Study' | 'Social';
  title: string;
  content: string;
  author: string;
  image: string;
  link: string;
  uploadedAt: Date;
  category: Category;
}

export interface Category {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}
