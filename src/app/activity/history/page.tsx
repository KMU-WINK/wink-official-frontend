'use client';

import { useState } from 'react';
import { FaAngleDown, FaAngleUp, FaCircle } from 'react-icons/fa';

import Image, { StaticImageData } from 'next/image';

import placeholder from '@/public/placeholder.png';

import { AnimatePresence, motion } from 'framer-motion';

type TimelineItem = {
  date: string;
  title: string;
  content: string;
  image: StaticImageData;
};

type YearData = {
  year: number;
  items: TimelineItem[];
};

const timelineData: YearData[] = Array.from({ length: 2 }, (_, yearIndex) => {
  const year = 2024 - yearIndex;

  const items = Array.from({ length: 12 }, (_, monthIndex) => {
    const month = 12 - monthIndex;
    const date = `${year % 100}.${String(month).padStart(2, '0')}.01`;

    return {
      date,
      title: '제목입니다.',
      content: `내용입니다. ${year}년 ${month}월에 활동한 내용입니다.`,
      image: placeholder,
    };
  });

  return { year, items };
});

const ActivityHistoryPage = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    console.log(id);
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="flex flex-col items-center mt-32">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-4xl text-center mb-6">
          WINK, 우리들의 파도
        </h1>
        <p className="font-regular text-xl text-center text-zinc-700">
          행사 / 세미나 / 대회 활동 기록을 년도 별로 볼 수 있습니다.
        </p>
      </div>

      <div className="relative mt-16">
        <div className="absolute ml-6 transform -translate-x-1/2 h-full mt-3 w-0.5 bg-gray-200"></div>

        {timelineData.map(yearData => (
          <div key={yearData.year} className="relative">
            <div className="absolute mt-3 transform -translate-x-full -translate-y-1/2 text-2xl font-bold text-gray-700">
              {yearData.year}
            </div>
            <div className="absolute ml-6 mt-3 transform -translate-x-1/2 -translate-y-2 w-4 h-4 rounded-full bg-wink-200" />
            <div className="w-history ml-20">
              {yearData.items.map((item, index) => (
                <div key={`${yearData.year}-${index}`} className="mb-4">
                  <button
                    onClick={() => toggleItem(`${yearData.year}-${index}`)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <span className="flex items-center">
                      <FaCircle size={6} className="w-4" />
                      <span className="w-20 text-left font-medium">
                        {item.date}
                      </span>
                      <span className="flex-grow text-left font-regular">
                        {item.title}
                      </span>
                    </span>
                    {openItems.includes(`${yearData.year}-${index}`) ? (
                      <FaAngleUp />
                    ) : (
                      <FaAngleDown />
                    )}
                  </button>

                  <AnimatePresence>
                    {openItems.includes(`${yearData.year}-${index}`) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="my-2 pr-6">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={620}
                            className="rounded-lg mb-2"
                          />
                          <p>{item.content}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityHistoryPage;
