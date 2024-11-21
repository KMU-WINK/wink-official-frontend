'use client';

import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';

import Title from '@/app/program/_component/title';
import Carousel from '@/app/program/project/_component/carousel';
import CreateProjectModal from '@/app/program/project/_component/modal/create-project';
import DeleteProjectModal from '@/app/program/project/_component/modal/delete-project';
import UpdateProjectModal from '@/app/program/project/_component/modal/update-project';

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';

import Api from '@/api';
import Page from '@/api/type/schema/page';
import Project from '@/api/type/schema/project';
import { isAdmin } from '@/api/type/schema/user';

import { useUserStore } from '@/store/user';

import { formatDate } from '@/util';

import { Pencil, Trash2, UserIcon } from 'lucide-react';

export default function ProgramProjectPage() {
  const { user } = useUserStore();

  const [projects, setProjects] = useState<Page<Project> | null>(null);

  const [page, setPage] = useState(0);

  const [createProjectModal, setCreateProjectModal] = useState(false);
  const [updateProjectModal, setUpdateProjectModal] = useState(false);
  const [deleteProjectModal, setDeleteProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [loading, setLoading] = useState(true);

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
    (async () => {
      const { projects } = await Api.Domain.Program.Project.getProjects(page);

      setProjects((prev) => ({
        page: projects.page,
        content: [...(prev?.content || []), ...projects.content],
      }));
      setLoading(false);
    })();
  }, [page]);

  return (
    <>
      <Title title="WINK, 우리들의 파도" subtitle="나날히 성장해 가는 우리" />

      <Button variant="wink" onClick={() => setCreateProjectModal(true)}>
        프로젝트 추가
      </Button>

      <div className="hidden sm:block py-5">
        <Carousel loading={loading} projects={projects?.content.slice(0, 6) || []} />
      </div>

      <div className="flex flex-wrap gap-4 sm:gap-8 items-center justify-center">
        {projects?.content.map((project) => (
          <div
            key={project.id}
            className="flex flex-col w-[300px] sm:w-[320px] border border-neutral-300 shadow-md rounded-3xl cursor-pointer"
            onClick={() => window.open(project.link, '_blank')}
          >
            <Image
              src={project.image}
              alt={project.title}
              width={640}
              height={360}
              className="h-[130px] rounded-t-3xl object-cover"
            />

            <div className="flex flex-col px-4 py-4">
              <div className="flex justify-between">
                <p className="text-lg font-semibold truncate">{project.title}</p>
                {user?.id === project.author.id ? (
                  <div className="flex space-x-2">
                    <Pencil
                      className="w-4 h-4 text-neutral-500 hover:text-black cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                        setUpdateProjectModal(true);
                      }}
                    />
                    <Trash2
                      className="w-4 h-4 text-neutral-500 hover:text-black cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                        setDeleteProjectModal(true);
                      }}
                    />
                  </div>
                ) : isAdmin(user?.role) ? (
                  <Trash2
                    className="w-4 h-4 text-neutral-500 hover:text-black cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                      setDeleteProjectModal(true);
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-neutral-500 truncate">{formatDate(project.createdAt)}</p>
                <div className="flex space-x-1">
                  <Avatar className="w-5 h-5">
                    <AvatarImage src={project.author.avatar} alt="avatar" />
                    <AvatarFallback>
                      <UserIcon />
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm text-neutral-500 truncate">{project.author.name}</p>
                </div>
              </div>
            </div>
          </div>
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
        project={selectedProject}
        callback={onUpdateProject}
      />
      <DeleteProjectModal
        open={deleteProjectModal}
        setOpen={setDeleteProjectModal}
        project={selectedProject}
        callback={onDeleteProject}
        isAdmin={isAdmin(user?.role)}
      />
    </>
  );
}
