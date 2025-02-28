import BaseSchema from '@/api/type/schema/base-schema';
import User from '@/api/type/schema/user';

export default interface Conference extends BaseSchema {
  location: string;
  date: string;
  surveyPresent: User[];
  surveyAbsent: User[];
  present: User[];
  absent: User[];
}
