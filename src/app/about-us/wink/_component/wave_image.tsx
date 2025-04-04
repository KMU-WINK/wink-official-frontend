import Image, { StaticImageData } from 'next/image';

import { cn } from '@/util';

type Direction = 'top' | 'bottom';

interface WaveImageProps {
  text: string;
  textStyle: string;
  direction: Direction;
  image: StaticImageData;
}

export default function WaveImage({ text, textStyle, direction, image }: WaveImageProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 sm:gap-4 text-left w-[216px] sm:w-[288px]',
        direction === 'bottom' && 'flex-col-reverse',
      )}
    >
      <p className={cn(textStyle, 'whitespace-pre-line')}>{text}</p>

      <Image
        src={image}
        alt={image.src}
        width={288}
        height={512}
        quality={100}
        placeholder="blur"
        priority={true}
        loading="eager"
        className="h-[384px] sm:h-[512px] rounded-xl object-cover"
      />
    </div>
  );
}
