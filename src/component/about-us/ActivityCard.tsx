import React from 'react';

import Image, { StaticImageData } from 'next/image';

interface ActivityCardProps {
  image: StaticImageData;
  title: string;
  description1: string;
  description2: string;
  isImageRight: boolean;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  image,
  title,
  description1,
  description2,
  isImageRight,
}) => {
  return (
    <div className={`flex ${isImageRight ? 'flex-row-reverse' : 'flex-row'} items-center my-8`}>
      <div className="w-1/2">
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="object-cover rounded-3xl"
        />
      </div>
      <div className="w-1/2 px-6">
        <h3 className="text-lg font-medium text-blue-500 mb-4">{title}</h3>
        <p className="font-medium text-xl mb-4">{description1}</p>
        <p className="font-medium text-[#6B7684]">{description2}</p>
      </div>
    </div>
  );
};
