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
        <div className="flex flex-col items-center justify-center pt-32">
          <h1 className="font-bold text-4xl text-center mb-6">WINK, 우리들의 파도</h1>
          <p className="font-regular text-xl text-center text-zinc-700">나날히 성장해 가는 우리</p>
        </div>
        {/* Carousel 영역 */}
        <div className="w-full max-w-carousel mt-32">
          <Carousel cards={sampleSliderProjects} />
        </div>
        {/* 프로젝트 목록 */}
        <div className="w-full max-w-project mx-auto mt-48 mb-20">
          <div className="grid grid-cols-3 gap-8">
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
              className="px-4 py-2 bg-white rounded-2xl border border-gray-400 hover:bg-gray-100 text-lg font-semibold"
            >
              목록 더 보기
            </button>
          </div>
        )}
      </div>
    </>
  );
}
