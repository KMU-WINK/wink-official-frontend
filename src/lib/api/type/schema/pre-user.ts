import BaseSchema from '@/api/type/schema/base-schema';
import BaseUser from '@/api/type/schema/base-user';

export default interface PreUser extends BaseUser, BaseSchema {
  token: string;
}
