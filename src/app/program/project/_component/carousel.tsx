import { useMemo, useState } from 'react';

import Image from 'next/image';

import { Skeleton } from '@/ui/skeleton';

import Project from '@/api/type/schema/project';

import { cn } from '@/util';

interface CarouselProps {
  loading: boolean;
  projects: Project[];
}

export default function Carousel({ loading, projects }: CarouselProps) {
  const [angle, setAngle] = useState(360 * 1000);

  const rotateAngle = useMemo(() => 360 / projects.length, [projects.length]);
  const radian = useMemo(() => ((rotateAngle / 2) * Math.PI) / 180, [rotateAngle]);
  const tangent = useMemo(() => Math.round((275 + 35) / 2 / Math.tan(radian)), [radian]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className="w-[275px] h-[165px] relative perspective-1200"
        style={{
          perspective: '1200px',
          perspectiveOrigin: 'center -60%',
        }}
      >
        <div
          className="w-full h-full absolute transform-3d transition-transform duration-500"
          style={{
            transform: `rotateY(${-angle}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="absolute w-[275px] h-[165px] rounded-3xl"
                  style={{
                    transform: `rotateY(${60 * idx}deg) translateZ(268px)`,
                  }}
                />
              ))
            : projects.map(({ id, image, title, link }, idx) => {
                const thisAngle = rotateAngle * idx;

                const now = thisAngle === angle % 360;
                const next = thisAngle === (angle + rotateAngle) % 360;
                const prev = thisAngle === (angle - rotateAngle) % 360;

                return (
                  <Image
                    key={id}
                    src={image}
                    alt={title}
                    width={275}
                    height={165}
                    className={cn(
                      'absolute w-[275px] h-[165px] cursor-pointer rounded-3xl',
                      now ? 'shadow-lg' : 'grayscale brightness-75 blur-[2px]',
                    )}
                    style={{
                      transform: `rotateY(${thisAngle}deg) translateZ(${tangent}px)`,
                    }}
                    onClick={() => {
                      if (now) {
                        window.open(link, '_blank');
                      } else if (next || prev) {
                        setAngle((angle) => angle + (next ? rotateAngle : prev ? -rotateAngle : 0));
                      }
                    }}
                  />
                );
              })}
        </div>
      </div>

      <div className="pt-28">
        {loading ? (
          <Skeleton className="w-[300px] h-7" />
        ) : (
          <p className="font-semibold text-2xl">{projects[(angle % 360) / rotateAngle]?.title}</p>
        )}
      </div>

      <div className="flex space-x-2">
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} className="w-2 h-2 rounded-full" />
            ))
          : projects.map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  'w-2 h-2 rounded-full',
                  rotateAngle * idx === angle % 360 ? 'bg-neutral-700' : 'bg-neutral-300',
                )}
              />
            ))}
      </div>
    </div>
  );
}
