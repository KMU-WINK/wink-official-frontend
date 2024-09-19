// components/CardLayout.js
import Image from 'next/image';

const ActivityCard = ({ imageSrc, title, description, isImageRight, description2 }) => {
  return (
    <div className={`flex ${isImageRight ? 'flex-row-reverse' : 'flex-row'} items-center my-8`}>
      <div className="w-1/2">
        <Image src={imageSrc} alt={title} width={500} height={300} className="object-cover" />
      </div>
      <div className="w-1/2 px-6">
        <h3 className="text-lg font-medium text-blue-500 mb-4">{title}</h3>
        <p className="font-medium text-xl mb-4">{description}</p>
        <p className="font-medium text-[#6B7684]">{description2}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
