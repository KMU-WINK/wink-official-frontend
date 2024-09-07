'use client';

import { useState } from 'react';

import { StudyCard } from '@/components';

interface StudyType {
  id: number; // 유니크한 ID
  image: string | null; // 이미지 URL
  link: string; // 스터디 상세 페이지로 연결되는 링크
  title: string; // 스터디 제목
  description: string; // 스터디 설명
  category: string; // 카테고리 필드
}

const featuredStudies: StudyType[] = [
  {
    id: 1,
    image: null,
    link: 'https://example.com/study1',
    title: '주목할 스터디 1',
    description: '주목할 스터디 설명 1',
    category: 'HTML & CSS & JS',
  },
  {
    id: 2,
    image: null,
    link: 'https://example.com/study2',
    title: '주목할 스터디 2',
    description: '주목할 스터디 설명 2',
    category: 'HTML & CSS & JS',
  },
  {
    id: 3,
    image: null,
    link: 'https://example.com/study3',
    title: '주목할 스터디 3',
    description: '주목할 스터디 설명 3',
    category: 'HTML & CSS & JS',
  },
];

const latestStudies: StudyType[] = [
  {
    id: 1,
    image: null,
    link: 'https://example.com/latest1',
    title: '최신 스터디 1',
    description: '최신 스터디 설명 1',
    category: 'HTML & CSS & JS',
  },
  {
    id: 2,
    image: null,
    link: 'https://example.com/latest2',
    title: '최신 스터디 2',
    description: '최신 스터디 설명 2',
    category: 'React',
  },
  {
    id: 3,
    image: null,
    link: 'https://example.com/latest3',
    title: '최신 스터디 3',
    description: '최신 스터디 설명 3',
    category: 'React',
  },
  {
    id: 4,
    image: null,
    link: 'https://example.com/latest4',
    title: '최신 스터디 4',
    description: '최신 스터디 설명 4',
    category: 'Spring Boot',
  },
  {
    id: 5,
    image: null,
    link: 'https://example.com/latest5',
    title: '최신 스터디 5',
    description: '최신 스터디 설명 5',
    category: 'HTML & CSS & JS',
  },
  {
    id: 6,
    image: null,
    link: 'https://example.com/latest6',
    title: '최신 스터디 6',
    description: '최신 스터디 설명 6',
    category: 'HTML & CSS & JS',
  },
  {
    id: 7,
    image: null,
    link: 'https://example.com/latest7',
    title: '최신 스터디 7',
    description: '최신 스터디 설명 7',
    category: 'Express.js (Node.js)',
  },
  {
    id: 8,
    image: null,
    link: 'https://example.com/latest8',
    title: '최신 스터디 8',
    description: '최신 스터디 설명 8',
    category: 'React.js',
  },
  {
    id: 9,
    image: null,
    link: 'https://example.com/latest9',
    title: '최신 스터디 9',
    description: '최신 스터디 설명 9',
    category: '알고리즘',
  },
  {
    id: 10,
    image: null,
    link: 'https://example.com/latest10',
    title: '최신 스터디 10',
    description: '최신 스터디 설명 10',
    category: 'WINK 공홈 부수기',
  },
];

const categories = [
  'All',
  'HTML & CSS & JS',
  'React.js',
  'Express.js (Node.js)',
  '알고리즘',
  '인공지능',
  '개인 스터디 & 프로젝트',
  'Spring Boot',
  'WINK 공홈 부수기',
];

export default function Study() {
  const [visibleStudyCards, setVisibleStudyCards] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const loadMore = () => {
    setVisibleStudyCards((prevVisible) => prevVisible + 8);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  // 카테고리에 따라 필터링된 최신 스터디
  const filteredStudies =
    selectedCategory === 'All'
      ? latestStudies
      : latestStudies.filter((study) => study.category === selectedCategory);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center pt-[128px]">
          <h1 className="font-pretendard font-bold text-[40px] text-center mb-6">
            WINK, 우리들의 파도
          </h1>
          <p className="font-pretendard font-regular text-[20px] text-center text-[#4D4D4D]">
            나날히 성장해 가는 우리
          </p>
        </div>

        {/* 주목할 글 */}
        <div className="w-full max-w-[880px] mx-auto mt-[75px] mb-[144px]">
          <h2 className="font-pretendard font-semibold text-3xl mb-4">🔥 주목할 글</h2>
          <div className="flex flex-col items-center w-full gap-[28px]">
            {featuredStudies.map((study) => (
              <StudyCard key={study.id} study={study} />
            ))}
          </div>
        </div>

        {/* 최신글 */}
        <div className="w-full max-w-[880px] mx-auto mt-[50px] mb-[107.43px]">
          <div className="flex w-full justify-between gap-[28px] mb-16">
            <h2 className="font-pretendard font-semibold text-xl">🌱 최신글</h2>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-3 py-1 border border-[#DADADA] rounded-md"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-center gap-[28px]">
            {filteredStudies.slice(0, visibleStudyCards).map((study) => (
              <StudyCard key={study.id} study={study} />
            ))}
          </div>
        </div>

        {/* 더보기 버튼 */}
        {visibleStudyCards < latestStudies.length && (
          <div className="flex justify-center mb-72">
            <button
              onClick={loadMore}
              className="px-[15px] py-2 bg-white rounded-[15px] border border-[#DADADA] hover:bg-gray-100 font-pretendard text-lg font-semibold"
            >
              더 보기
            </button>
          </div>
        )}
      </div>
    </>
  );
}
