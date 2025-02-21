import BaseSchema from '@/api/type/schema/base-schema';
import User from '@/api/type/schema/user';

export default interface Project extends BaseSchema {
  author: User;
  title: string;
  description: string;
  image: string;
  link: string;
}
