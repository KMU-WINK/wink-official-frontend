// components/CardLayout.js
import Image from 'next/image';

const ActivityCard = ({ imageSrc, title, description, isImageRight }) => {
  return (
    <div
      className={`flex ${isImageRight ? 'flex-row-reverse' : 'flex-row'} items-center my-8`}
    >
      <div className="w-1/2">
        <Image
          src={imageSrc}
          alt={title}
          width={500}
          height={300}
          className="object-cover rounded-lg"
        />
      </div>
      <div className="w-1/2 px-6">
        <h3 className="text-xl font-bold text-blue-500 mb-4">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
