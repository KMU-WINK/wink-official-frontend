'use client';

import { useEffect, useState } from 'react';

import { Editor } from '@/component';

import { ProjectType, WinkApi } from '@/api';

import { formatDate } from '@/util';

interface ActivityProjectViewPageProps {
  params: { id: string };
}

const ActivityProjectViewPage = ({ params }: ActivityProjectViewPageProps) => {
  const [project, setProject] = useState<ProjectType | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const { project } = await WinkApi.Activity.Project.getProject({ projectId: params.id });
      setProject(project);
    };

    (async () => {
      await fetchProject();
    })();
  }, []);

  if (!project) {
    return null;
  }

  return (
    <div className="container mx-auto mt-24">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="text-gray-600">{project.author.name}</span>
          <span className="text-gray-400 ml-4">{formatDate(project.createdAt)}</span>
        </div>
      </div>
      <div className="mt-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div>
        <Editor content={project.content} setContent={() => {}} readonly={true} />
      </div>
    </div>
  );
};

export default ActivityProjectViewPage;
