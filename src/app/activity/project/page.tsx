'use client';

import { useEffect, useState } from 'react';

import { Carousel, ProjectCard } from '@/component';

import { ProjectType, WinkApi } from '@/api';

const ProjectPage = () => {
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);

  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    const fetchMaxPage = async () => {
      const { page } = await WinkApi.Activity.Project.getProjectsPage();
      setMaxPage(page);
    };

    (async () => {
      await fetchMaxPage();
    })();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      const { projects } = await WinkApi.Activity.Project.getProjects({
        page,
      });
      setProjects((prev) => [...prev, ...projects]);
    };

    (async () => {
      await fetchProjects();
    })();
  }, [page]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center pt-32">
          <h1 className="font-bold text-4xl text-center mb-6">WINK, 우리들의 파도</h1>
          <p className="font-regular text-xl text-center text-zinc-700">나날히 성장해 가는 우리</p>
        </div>

        {/* Carousel 영역 */}
        <div className="w-carousel mt-32">
          <Carousel
            cards={projects.slice(0, 6).map(({ _id, ...rest }) => ({
              id: _id,
              ...rest,
            }))}
          />
        </div>

        {/* 프로젝트 목록 */}
        <div className="w-project mx-auto mt-48 mb-20">
          <div className="grid grid-cols-3 gap-8">
            {projects.slice(6).map(({ _id, createdAt, title, tags, image }) => (
              <ProjectCard
                key={_id}
                id={_id}
                createdAt={createdAt}
                title={title}
                tags={tags}
                image={image}
              />
            ))}
          </div>
        </div>

        {/* 더보기 버튼 */}
        {page < maxPage && (
          <div className="flex justify-center mb-10">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-white rounded-2xl border border-gray-400 hover:bg-gray-100 text-lg font-semibold"
            >
              목록 더 보기
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectPage;
