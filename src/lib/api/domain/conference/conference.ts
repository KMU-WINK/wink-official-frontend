import WinkRequest from '@/api/request';
import { GetConferenceResponse, GetCurrentParticipantResponse } from '@/api/type/domain/conference';

export default class Conference {
  constructor(private readonly request: WinkRequest) {}

  public async getConference(conferenceId: string): Promise<GetConferenceResponse> {
    return this.request.get(`/conference/${conferenceId}`);
  }

  public async current(conferenceId: string): Promise<GetCurrentParticipantResponse> {
    return this.request.get(`/conference/${conferenceId}/survey`);
  }

  public async surveyPresent(conferenceId: string): Promise<void> {
    return this.request.post(`/conference/${conferenceId}/survey/present`);
  }

  public async surveyAbsent(conferenceId: string): Promise<void> {
    return this.request.post(`/conference/${conferenceId}/survey/absent`);
  }
}
