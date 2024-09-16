import { WinkApiRequest } from '@/api';

export class Social {
  constructor(private readonly request: WinkApiRequest) {}

  public async getSocial(data: GetSocialRequestDto): Promise<GetSocialResponseDto> {
    return this.request.get('/activity/social/detail?socialId=' + data.socialId);
  }

  public async getSocials(data: GetSocialsRequestDto): Promise<GetSocialsResponseDto> {
    return this.request.get('/activity/social?page=' + data.page);
  }

  public async searchSocials(data: SearchSocialsRequestDto): Promise<GetSocialsResponseDto> {
    return this.request.get('/activity/social/search?query=' + data.query);
  }
}

export class SocialAdmin {
  constructor(private readonly request: WinkApiRequest) {}

  public async createSocial(data: CreateSocialRequestDto): Promise<CreateSocialResponseDto> {
    return this.request.put('/admin/activity/social', data);
  }

  public async updateSocial(data: UpdateSocialRequestDto): Promise<void> {
    return this.request.patch('/admin/activity/social', data);
  }

  public async deleteSocial(data: DeleteSocialRequestDto): Promise<void> {
    return this.request.delete('/admin/activity/social', data);
  }
}

//////////////////////////////////////////////////////////////////////////

export interface CreateSocialRequestDto {
  title: string;
  contents: Content[];
}

export interface DeleteSocialRequestDto {
  socialId: string;
}

export interface GetSocialRequestDto {
  socialId: string;
}

export interface GetSocialsRequestDto {
  page: number;
}

export interface SearchSocialsRequestDto {
  query: string;
}

export interface UpdateSocialRequestDto {
  socialId: string;
  title: string;
  contents: Content[];
}

//////////////////////////////////////////////////////////////////////////

export interface CreateSocialResponseDto {
  social: SocialType;
}

export interface GetSocialResponseDto {
  social: SocialType;
}

export interface GetSocialsResponseDto {
  socials: SocialType[];
}

//////////////////////////////////////////////////////////////////////////

export interface SocialType {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  type: 'Project' | 'Study' | 'Social';
  title: string;
  contents: Content[];
}

export interface Content {
  content: string;
  image: string;
}
