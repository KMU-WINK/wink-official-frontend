import BaseSchema from '@/api/type/schema/base-schema';

export default interface Activity extends BaseSchema {
  title: string;
  description: string;
  images: string[];
  pinned: boolean;
}
