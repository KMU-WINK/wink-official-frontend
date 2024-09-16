'use client';

import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { toast } from 'react-toastify';

import Link from 'next/link';

import { AdminIconButton, AdminSearchBar, AdminTablePaging, AdminTitle, Modal } from '@/component';

import { ProjectType, WinkApi } from '@/api';

import { formatDate } from '@/util';

const AdminActivityProjectPage = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);

  const [query, setQuery] = useState<string>('');

  const [deleteModal, setDeleteModal] = useState<ProjectType | null>(null);

  const handleDelete = async () => {
    if (!deleteModal) return;

    await WinkApi.Activity.ProjectAdmin.deleteProject({ projectId: deleteModal._id });
    await fetchProjects();

    toast.warn(`"${deleteModal.title}" 프로젝트가 삭제되었습니다.`);

    setDeleteModal(null);
  };

  useEffect(() => {
    async function fetchMaxPage() {
      const { page } = await WinkApi.Activity.Project.getProjectsPage();
      setMaxPage(page);
    }

    (async () => {
      await fetchMaxPage();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await fetchProjects();
    })();
  }, [page, query]);

  async function fetchProjects() {
    if (query) {
      const { projects } = await WinkApi.Activity.Project.searchProjects({ query });
      setProjects(projects);
    } else {
      const { projects } = await WinkApi.Activity.Project.getProjects({ page });
      setProjects(projects);
    }
  }

  return (
    <div className="container mx-auto mt-4">
      <AdminTitle title="Activity" subtitle="프로젝트" />

      <div className="flex justify-end mb-4 space-x-4">
        <AdminSearchBar value={query} placeholder="제목을 검색해주세요." onChange={setQuery} />

        <AdminIconButton
          icon={<FaEdit />}
          text="프로젝트 추가"
          className="bg-wink-500 hover:bg-wink-600 border-0 text-white"
          onClick={() => {}}
        />
      </div>

      <div className="min-w-full grid grid-cols-12 gap-2 border-b">
        <div className="pt-4 py-2 px-4 col-span-7 text-left text-sm font-semibold text-gray-600">
          제목
        </div>
        <div className="pt-4 py-2 px-4 col-span-3 text-left text-sm font-semibold text-gray-600">
          업로드 날짜
        </div>
        <div className="pt-4 py-2 px-4 col-span-1 text-left text-sm font-semibold text-gray-600">
          수정
        </div>
        <div className="pt-4 py-2 px-4 col-span-1 text-left text-sm font-semibold text-gray-600">
          삭제
        </div>
      </div>

      {projects.map((project) => (
        <div key={project._id} className="grid grid-cols-12 gap-2 border-b border-gray-200">
          <Link
            href={`/activity/project/${project._id}`}
            className="py-4 px-4 col-span-7 text-sm truncate"
          >
            {project.title}
          </Link>
          <div className="py-4 px-4 col-span-3 text-sm">{formatDate(project.createdAt)}</div>
          <div className="col-span-1 flex items-center justify-center space-x-8">
            <FaEdit size={18} className="cursor-pointer" onClick={() => {}} />
          </div>
          <div className="col-span-1 flex items-center justify-center space-x-8">
            <FaTrashCan
              size={18}
              className="cursor-pointer"
              onClick={() => setDeleteModal(project)}
            />
          </div>
        </div>
      ))}

      <Modal isOpen={!!deleteModal} onClose={() => setDeleteModal(null)}>
        <h2 className="text-xl font-bold mb-4">정말로 삭제하시겠습니까?</h2>
        <p>{deleteModal?.title}</p>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
            onClick={handleDelete}
          >
            삭제
          </button>

          <button
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-600 rounded-md ml-2"
            onClick={() => setDeleteModal(null)}
          >
            취소
          </button>
        </div>
      </Modal>

      {!query && <AdminTablePaging page={page} setPage={setPage} maxPage={maxPage} />}
    </div>
  );
};

export default AdminActivityProjectPage;
