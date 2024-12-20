import BaseSchema from '@/api/type/schema/base-schema';

export default interface Study extends BaseSchema {
  index: number;
  category: string;
  title: string;
  author: string;
  content: string;
  image?: string;
}
