'use client';

import { useCallback, useEffect, useState } from 'react';

import Title from '@/app/program/_component/title';
import Carousel from '@/app/program/project/_component/carousel';
import CreateProjectModal from '@/app/program/project/_component/modal/create-project';
import DeleteProjectModal from '@/app/program/project/_component/modal/delete-project';
import UpdateProjectModal from '@/app/program/project/_component/modal/update-project';
import ProjectCard from '@/app/program/project/_component/project-card';

import { Button } from '@/ui/button';
import { Skeleton } from '@/ui/skeleton';

import Api from '@/api';
import Page from '@/api/type/schema/page';
import Project from '@/api/type/schema/project';
import { isAdmin } from '@/api/type/schema/user';
import { useApi } from '@/api/useApi';

import { useUserStore } from '@/store/user';

import { parseAsInteger, useQueryState } from 'nuqs';

export default function ProgramProjectPage() {
  const { user } = useUserStore();

  const [isApi, startApi] = useApi();

  const [projects, setProjects] = useState<Page<Project>>();
  const [selected, setSelected] = useState<Project>();

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(0));

  const [createProjectModal, setCreateProjectModal] = useState(false);
  const [updateProjectModal, setUpdateProjectModal] = useState(false);
  const [deleteProjectModal, setDeleteProjectModal] = useState(false);

  const onCreateProject = useCallback((project: Project) => {
    setProjects((prev) => ({
      page: prev!.page,
      content: [project, ...prev!.content],
    }));
  }, []);

  const onUpdateProject = useCallback((project: Project) => {
    setProjects((prev) => ({
      page: prev!.page,
      content: prev!.content.map((p) => (p.id === project.id ? project : p)),
    }));
  }, []);

  const onDeleteProject = useCallback((id: string) => {
    setProjects((prev) => ({
      page: prev!.page,
      content: prev!.content.filter((p) => p.id !== id),
    }));
  }, []);

  useEffect(() => {
    startApi(async () => {
      const { projects } = await Api.Domain.Program.Project.getProjects(page);
      setProjects((prev) => ({
        page: projects.page,
        content: [...(prev?.content || []), ...projects.content],
      }));
    });
  }, [page]);

  return (
    <>
      <Title title="WINK, 우리들의 파도" subtitle="나날히 성장해 가는 우리" />

      {user && (
        <Button variant="wink" onClick={() => setCreateProjectModal(true)}>
          프로젝트 추가
        </Button>
      )}

      <div className="hidden sm:block py-5">
        <Carousel loading={isApi} projects={projects?.content.slice(0, 6) || []} />
      </div>

      <div className="flex flex-wrap gap-4 sm:gap-8 items-center justify-center max-w-[1050px]">
        {projects
          ? projects.content.map((project) => (
              <ProjectCard
                key={project.id}
                user={user}
                project={project}
                setSelectedProject={setSelected}
                setUpdateProjectModal={setUpdateProjectModal}
                setDeleteProjectModal={setDeleteProjectModal}
              />
            ))
          : Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className="w-[280px] sm:w-[320px] h-[184px] sm:h-[212px] rounded-3xl"
              />
            ))}
      </div>

      {projects && projects.page.totalPages - 1 > page && (
        <Button variant="outline" onClick={() => setPage(page + 1)}>
          더보기
        </Button>
      )}

      <CreateProjectModal
        open={createProjectModal}
        setOpen={setCreateProjectModal}
        callback={onCreateProject}
      />

      <UpdateProjectModal
        open={updateProjectModal}
        setOpen={setUpdateProjectModal}
        project={selected}
        callback={onUpdateProject}
      />

      <DeleteProjectModal
        open={deleteProjectModal}
        setOpen={setDeleteProjectModal}
        project={selected}
        callback={onDeleteProject}
        isAdmin={isAdmin(user?.role)}
      />
    </>
  );
}
