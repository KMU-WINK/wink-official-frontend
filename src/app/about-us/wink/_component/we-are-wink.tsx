import Image, { StaticImageData } from 'next/image';

interface WeAreWinkProps {
  image: StaticImageData;
}

export default function WeAreWink({ image }: WeAreWinkProps) {
  return (
    <div className="flex flex-col w-[320px] sm:w-full sm:max-w-[640px] space-y-2 sm:space-y-4 items-center sm:items-start">
      <p className="text-2xl sm:text-4xl font-medium">
        안녕하세요. 우리는 <span className="font-extrabold">WINK</span>입니다.
      </p>

      <Image
        src={image}
        alt={image.src}
        width={640}
        height={360}
        quality={100}
        placeholder="blur"
        priority
        className="h-[180px] sm:h-[360px] rounded-md object-cover"
      />
    </div>
  );
}
