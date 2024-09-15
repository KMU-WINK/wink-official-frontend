import { WinkApiRequest } from '@/api';

export class CommonAdmin {
  constructor(private readonly request: WinkApiRequest) {}

  public async upload(image: File): Promise<UploadResponseDto> {
    const data = new FormData();
    data.append('image', image);

    return this.request.post('/admin/activity/upload', data);
  }
}

//////////////////////////////////////////////////////////////////////////

export interface UploadResponseDto {
  link: string;
}
