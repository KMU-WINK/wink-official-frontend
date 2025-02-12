import Image from 'next/image';

import { activity } from '@/app/about-us/wink/_constant/activity';

import { cn } from '@/util';

import { motion } from 'framer-motion';

export default function Activity() {
  return (
    <div className="flex flex-col w-[320px] sm:w-full sm:max-w-[640px] space-y-4 sm:space-y-8 items-center sm:items-start">
      <p className="text-2xl sm:text-3xl font-semibold">
        우리는 어떤 길을 <br className="hidden sm:block" />
        걸어왔을까요?
      </p>

      <div className="flex flex-col space-y-8 overflow-hidden">
        {activity.map(({ tag, title, description, image }, index) => (
          <motion.div
            key={tag}
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8"
          >
            <div
              className={cn(
                'order-2 flex flex-col space-y-1 sm:space-y-2 justify-center',
                index % 2 === 0 ? 'sm:order-2' : 'sm:order-1',
              )}
            >
              <p className="text-sm sm:text-base font-medium text-wink-500">{tag}</p>
              <p className="text-xl sm:text-2xl font-medium whitespace-pre-line">{title}</p>
              <p className="text-sm sm:text-base text-neutral-500 whitespace-pre-line">
                {description}
              </p>
            </div>
            <div className={cn('order-1', index % 2 === 0 ? 'sm:order-1' : 'sm:order-2')}>
              <Image
                src={image}
                alt={image.src}
                width={320}
                height={180}
                placeholder="blur"
                className="h-[180px] sm:h-auto rounded-md object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
