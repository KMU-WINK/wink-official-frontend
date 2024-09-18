'use client';

import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { toast } from 'react-toastify';

import Link from 'next/link';

import {
  FormContainer,
  IconButton,
  Modal,
  SearchBar,
  TablePaging,
  TextField,
  Title,
} from '@/component';

import { useForm } from '@/hook';

import { StudyType, WinkApi } from '@/api';

import { formatDate } from '@/util';

import * as yup from 'yup';

type Inputs = 'link';

const AdminActivityStudyPage = () => {
  const [studies, setStudies] = useState<StudyType[]>([]);

  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(0);

  const [query, setQuery] = useState<string>('');

  const [createModal, setCreateModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<StudyType | null>(null);

  const { values, setValues, errors, setErrors, onChange, validate } = useForm<
    Inputs,
    string
  >(
    yup.object({
      link: yup
        .string()
        .required('링크를 입력해주세요.')
        .url('올바른 URL을 입력해주세요.')
        .matches(
          /^https:\/\/cs-kookmin-club\.tistory\.com\/\d+$/,
          '올바른 국민대학교 티스토리 URL을 입력해주세요.',
        ),
    }),
  );

  useEffect(() => {
    async function fetchMaxPage() {
      const { page } = await WinkApi.Activity.Study.getStudiesPage();
      setMaxPage(page);
    }

    (async () => {
      await fetchMaxPage();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await fetchStudies();
    })();
  }, [page, query]);

  async function fetchStudies() {
    if (query) {
      const { studies } = await WinkApi.Activity.Study.searchStudies({ query });
      setStudies(studies);
    } else {
      const { studies } = await WinkApi.Activity.Study.getStudies({ page });
      setStudies(studies);
    }
  }

  const handleCreate = async () => {
    if (!(await validate())) {
      return;
    }

    await WinkApi.Activity.StudyAdmin.createStudy(values);
    await fetchStudies();

    setCreateModal(false);
    setValues({ link: '' });
    setErrors({ link: '' });

    toast.success('스터디가 추가되었습니다.');
  };

  const handleDelete = async () => {
    if (!deleteModal) return;

    await WinkApi.Activity.StudyAdmin.deleteStudy({ studyId: deleteModal._id });
    await fetchStudies();

    toast.warn(`"${deleteModal.title}" 스터디가 삭제되었습니다.`);

    setDeleteModal(null);
  };

  return (
    <div className="container mx-auto mt-4">
      <Title title="Activity" subtitle="스터디" />

      <div className="flex justify-end mb-4 space-x-4">
        <SearchBar
          value={query}
          placeholder="제목을 검색해주세요."
          onChange={setQuery}
        />

        <IconButton
          icon={<FaEdit />}
          text="스터디 추가"
          className="bg-wink-500 hover:bg-wink-600 border-0 text-white"
          onClick={() => setCreateModal(true)}
        />
      </div>

      <div className="min-w-full grid grid-cols-12 gap-2 border-b">
        <div className="pt-4 py-2 px-4 col-span-2 text-left text-sm font-semibold text-gray-600">
          카테고리
        </div>
        <div className="pt-4 py-2 px-4 col-span-6 text-left text-sm font-semibold text-gray-600">
          제목
        </div>
        <div className="pt-4 py-2 px-4 col-span-3 text-left text-sm font-semibold text-gray-600">
          업로드 날짜
        </div>
        <div className="pt-4 py-2 px-4 col-span-1 text-left text-sm font-semibold text-gray-600">
          삭제
        </div>
      </div>

      {studies.map(study => (
        <div
          key={study._id}
          className="grid grid-cols-12 gap-2 border-b border-gray-200"
        >
          <div className="py-4 px-4 col-span-2 text-sm truncate">
            {study.category.name}
          </div>

          <Link
            href={study.link}
            className="py-4 px-4 col-span-6 text-sm truncate"
          >
            {study.title}
          </Link>

          <div className="py-4 px-4 col-span-3 text-sm">
            {formatDate(study.uploadedAt)}
          </div>

          <div className="col-span-1 flex items-center justify-center space-x-8">
            <FaTrashCan
              size={18}
              className="cursor-pointer"
              onClick={() => {
                setDeleteModal(study);
              }}
            />
          </div>
        </div>
      ))}

      <Modal isOpen={createModal} onClose={() => setCreateModal(false)}>
        <h2 className="text-xl font-bold mb-4">스터디 추가</h2>

        <FormContainer values={values} errors={errors} onChange={onChange}>
          <div className="flex items-center gap-2.5">
            <TextField
              type="url"
              id="link"
              placeholder="스터디 링크를 입력해주세요."
              className="p-2 text-sm border"
            />
          </div>
        </FormContainer>

        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-wink-500 hover:bg-wink-600 text-white rounded-md"
            onClick={handleCreate}
          >
            추가
          </button>

          <button
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-600 rounded-md ml-2"
            onClick={() => setCreateModal(false)}
          >
            취소
          </button>
        </div>
      </Modal>

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

      {!query && maxPage > 0 && (
        <TablePaging page={page} setPage={setPage} maxPage={maxPage} />
      )}
    </div>
  );
};

export default AdminActivityStudyPage;
