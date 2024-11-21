import WinkRequest from '@/api/request';
import { UploadImageResponse } from '@/api/type/domain/program/upload';

export default class Upload {
  constructor(private readonly request: WinkRequest) {}

  public async uploadImage(): Promise<UploadImageResponse> {
    return this.request.post('/program/upload');
  }
}
