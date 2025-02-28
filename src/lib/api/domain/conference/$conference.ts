import WinkRequest from '@/api/request';
import {
  CreateConferenceRequest,
  GetConferenceResponse,
  GetConferencesPageableResponse,
  GetConferencesResponse,
} from '@/api/type/domain/conference';

export default class AdminConference {
  constructor(private readonly request: WinkRequest) {}

  public async getConferences(page: number = 0): Promise<GetConferencesPageableResponse> {
    return this.request.get(`/admin/conference?page=${page}`);
  }

  public async getAttendance(year: number): Promise<GetConferencesResponse> {
    return this.request.get(`/admin/conference/attendance?year=${year}`);
  }

  public async getConference(conferenceId: string): Promise<GetConferenceResponse> {
    return this.request.get(`/admin/conference/${conferenceId}`);
  }

  public async createConference(data: CreateConferenceRequest): Promise<GetConferenceResponse> {
    return this.request.post('/admin/conference', data);
  }

  public async updateConference(
    conferenceId: string,
    data: CreateConferenceRequest,
  ): Promise<GetConferenceResponse> {
    return this.request.put(`/admin/conference/${conferenceId}`, data);
  }

  public async deleteConference(conferenceId: string): Promise<void> {
    return this.request.delete(`/admin/conference/${conferenceId}`);
  }

  public async present(conferenceId: string, userId: string): Promise<void> {
    return this.request.post(`/admin/conference/${conferenceId}/present/${userId}`);
  }

  public async absent(conferenceId: string, userId: string): Promise<void> {
    return this.request.post(`/admin/conference/${conferenceId}/absent/${userId}`);
  }
}
