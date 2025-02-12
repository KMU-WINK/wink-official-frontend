import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';

import Project from '@/api/type/schema/project';
import User, { isAdmin } from '@/api/type/schema/user';

import { formatDate } from '@/util';

import { Pencil, Trash2, UserIcon } from 'lucide-react';

interface ProjectCardProps {
  user: User | null;
  project: Project;
  setSelectedProject: (project: Project) => void;
  setUpdateProjectModal: (value: boolean) => void;
  setDeleteProjectModal: (value: boolean) => void;
}

export default function ProjectCard({
  user,
  project,
  setSelectedProject,
  setUpdateProjectModal,
  setDeleteProjectModal,
}: ProjectCardProps) {
  return (
    <div
      className="flex flex-col w-[280px] sm:w-[320px] border border-neutral-300 shadow-md rounded-3xl cursor-pointer"
      onClick={() => window.open(project.link, '_blank')}
    >
      <Image
        src={project.image}
        alt={project.title}
        width={320}
        height={130}
        quality={100}
        className="h-[110px] sm:h-[130px] rounded-t-3xl object-cover"
      />

      <div className="flex flex-col px-4 py-4">
        <div className="flex justify-between">
          <p className="sm:text-lg font-medium truncate">{project.title}</p>
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
          <p className="text-xs sm:text-sm text-neutral-500 truncate">
            {formatDate(project.createdAt)}
          </p>
          <div className="flex space-x-1">
            <Avatar className="w-4 sm:w-5 h-4 sm:h-5">
              <AvatarImage src={project.author.avatar} alt="avatar" />
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
            <p className="text-xs sm:text-sm text-neutral-500 truncate">{project.author.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
