import BaseSchema from '@/api/type/schema/base-schema';
import Recruit from '@/api/type/schema/recruit';

export default interface RecruitSms extends BaseSchema {
  recruit: Recruit;
  paperFail: string;
  paperPass: string;
  finalFail: string;
  finalPass: string;
}
