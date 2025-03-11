import BaseUser from '@/api/type/schema/base-user';

export default interface PreUser extends BaseUser {
  token: string;
  test: boolean;
}
