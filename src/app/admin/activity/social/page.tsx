'use client';

import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';

import Link from 'next/link';

import { AdminIconButton, AdminSearchBar, AdminTablePaging, AdminTitle } from '@/component';

import { StudyType, WinkApi } from '@/api';

import { formatDate } from '@/util';

const AdminActivitySocialPage = () => {
  const [studies, setStudies] = useState<StudyType[]>([]);

  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);

  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    async function fetchingStudies() {
      const { studies } = await WinkApi.Activity.Study.getStudies({ page });
      setStudies(studies);
    }

    async function fetchMaxPage() {
      const { page } = await WinkApi.Activity.Study.getStudiesPage();
      setMaxPage(page);
    }

    (async () => {
      await fetchingStudies();
      await fetchMaxPage();
    })();
  }, [page]);

  return (
    <div className="container mx-auto mt-4">
      <AdminTitle title="Activity" subtitle="스터디" />

      <div className="flex justify-end mb-4 space-x-4">
        <AdminSearchBar value={query} placeholder="제목을 검색해주세요." onChange={setQuery} />

        <AdminIconButton
          icon={<FaEdit />}
          text="스터디 추가"
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

      {studies.map((study) => (
        <div key={study._id} className="grid grid-cols-12 gap-2 border-b border-gray-200">
          <Link href={study.link} className="py-4 px-4 col-span-7 text-sm truncate">
            {study.title}
          </Link>
          <div className="py-4 px-4 col-span-3 text-sm">{formatDate(study.uploadedAt)}</div>
          <div className="col-span-1 flex items-center justify-center space-x-8">
            <FaEdit size={18} className="cursor-pointer" onClick={() => {}} />
          </div>
          <div className="col-span-1 flex items-center justify-center space-x-8">
            <FaTrashCan size={18} className="cursor-pointer" onClick={() => {}} />
          </div>
        </div>
      ))}

      {!query && <AdminTablePaging page={page} setPage={setPage} maxPage={maxPage} />}
    </div>
  );
};

export default AdminActivitySocialPage;
