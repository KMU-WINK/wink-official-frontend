import BaseSchema from '@/api/type/schema/base-schema';

export default interface History extends BaseSchema {
  title: string;
  image: string;
  date: string;
}
