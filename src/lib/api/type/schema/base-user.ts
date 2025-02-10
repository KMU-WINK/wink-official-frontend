import BaseSchema from '@/api/type/schema/base-schema';

export default interface BaseUser extends BaseSchema {
  email: string;
  name: string;
  studentId: string;
  department: string;
  phoneNumber: string;
}
