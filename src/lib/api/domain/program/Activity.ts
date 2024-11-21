import WinkRequest from '@/api/request';
import { GetActivitiesResponse } from '@/api/type/domain/program/activity';

export default class Activity {
  constructor(private readonly request: WinkRequest) {}

  public async getActivities(): Promise<GetActivitiesResponse> {
    return this.request.get('/program/activity');
  }
}
