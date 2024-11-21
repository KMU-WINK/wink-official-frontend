import { ReactNode } from 'react';

import Title from '@/app/recruit/_component/title';
import { Title as TitleType } from '@/app/recruit/_component/title';

interface ItemsProps extends TitleType {
  children: ReactNode;
}

export default function Items({ title, description, children }: ItemsProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-8">
      <Title title={title} description={description} />

      <div className="flex flex-row flex-wrap justify-center items-center gap-4 sm:gap-8">
        {children}
      </div>
    </div>
  );
}
