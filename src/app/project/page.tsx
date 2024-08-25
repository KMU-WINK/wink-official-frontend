'use client';

import { useState } from 'react';

import { Carousel, ProjectCard } from '@/components';

interface Project {
  id: number;
  title: string;
  imageUrl: string | null;
  tags: string[];
  year: number;
  link: string;
}

const sampleProjects: Project[] = Array.from({ length: 24 }, (_, index) => ({
  id: index + 1,
  title: `Project ${index + 1}`,
  imageUrl: null,
  tags: [`태그${(index % 3) + 1}`, `태그${(index % 3) + 2}`],
  year: 2020 + (index % 4),
  link: 'https://example.com',
}));

const sampleSliderProjects = Array.from({ length: 6 }, (_, index) => ({
  id: index,
  title: `Project ${index + 1}`,
  imageUrl: null,
  content: '프로젝트 간단한 설명',
  link: `https://example.com`,
}));

export default function Project() {
  const [visibleProjects, setVisibleProjects] = useState(18);

  const loadMore = () => {
    setVisibleProjects((prevVisible) => prevVisible + 18);
  };

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
        {/* Carousel 영역 */}
        <div className="w-full max-w-[895px] mt-[129px]">
          <Carousel cards={sampleSliderProjects} />
        </div>
        {/* 프로젝트 목록 */}
        <div className="w-full max-w-[1150px] mx-auto mt-[199.6px] mb-[85.6px]">
          <div className="grid grid-cols-3 gap-[34px]">
            {sampleProjects.slice(0, visibleProjects).map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                imageUrl={project.imageUrl}
                tags={project.tags}
                year={project.year}
                link={project.link}
              />
            ))}
          </div>
        </div>
        {/* 더보기 버튼 */}
        {visibleProjects < sampleProjects.length && (
          <div className="flex justify-center mb-10">
            <button
              onClick={loadMore}
              className="px-[15px] py-2 bg-white rounded-[15px] border border-[#DADADA] hover:bg-gray-100 font-pretendard text-lg font-semibold"
            >
              목록 더 보기
            </button>
          </div>
        )}
      </div>
    </>
  );
}
