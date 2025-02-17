import Image from 'next/image';

import Study from '@/api/type/schema/study';

import { CircleHelp } from 'lucide-react';

export default function StudyCard({ index, category, title, author, content, image }: Study) {
  return (
    <div
      className="flex flex-col-reverse sm:flex-row justify-between w-[300px] sm:w-full sm:max-w-[900px] border border-neutral-200 rounded-xl cursor-pointer"
      onClick={() => window.open(`https://cs-kookmin-club.tistory.com/${index}`, '_blank')}
    >
      <div className="flex flex-col space-y-1 p-4">
        <p className="text-xs text-neutral-500">{category}</p>
        <p className="text-sm sm:text-lg font-bold">{title}</p>
        <p className="text-xs sm:text-sm text-neutral-700 line-clamp-2">{content}</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-0.5 sm:space-y-0">
          <p className="hidden sm:block text-xs sm:text-sm text-neutral-500">
            https://cs-kookmin-club.tistory.com/{index}
          </p>
          <p className="text-xs sm:text-sm text-neutral-500">{author}</p>
        </div>
      </div>

      <div className="flex items-center justify-center h-[125px] sm:h-[150px] min-w-[180px]">
        {image ? (
          <Image
            src={image}
            alt={title}
            width={200}
            height={125}
            quality={100}
            className="w-full h-[125px] sm:h-[150px] object-cover rounded-tl-xl rounded-tr-xl sm:rounded-tl-none sm:rounded-br-xl"
          />
        ) : (
          <div className="w-full h-[125px] sm:h-[150px] bg-neutral-200 rounded-tl-xl rounded-tr-xl sm:rounded-tl-none sm:rounded-br-xl flex items-center justify-center">
            <CircleHelp className="w-10 h-10 text-neutral-400" />
          </div>
        )}
      </div>
    </div>
  );
}
