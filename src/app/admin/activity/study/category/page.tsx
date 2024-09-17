'use client';

import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { toast } from 'react-toastify';

import { FormContainer, IconButton, Modal, TextField, Title } from '@/component';

import { useForm } from '@/hook';

import { EachGetCategoriesResponseDto, WinkApi } from '@/api';

import * as yup from 'yup';

type Inputs = 'category';

const AdminActivityStudyCategoryPage = () => {
  const [categories, setCategories] = useState<EachGetCategoriesResponseDto[]>([]);

  const [createModal, setCreateModal] = useState<boolean>(false);
  const [modifyModal, setModifyModal] = useState<EachGetCategoriesResponseDto | null>(null);
  const [deleteModal, setDeleteModal] = useState<EachGetCategoriesResponseDto | null>(null);

  const { values, setValues, errors, setErrors, onChange, validate } = useForm<Inputs, string>(
    yup.object({
      category: yup.string().required('카테고리 이름을 입력해주세요.'),
    }),
  );

  useEffect(() => {
    (async () => {
      await fetchCategories();
    })();
  }, []);

  async function fetchCategories() {
    const { categories } = await WinkApi.Activity.Study.getCategories();
    setCategories(categories);
  }

  const handleCreate = async () => {
    if (!(await validate())) {
      return;
    }

    await WinkApi.Activity.StudyAdmin.createCategory(values);
    await fetchCategories();

    setCreateModal(false);
    setValues({ category: '' });
    setErrors({ category: '' });

    toast.success(`"${values.category}" 카테고리 추가되었습니다.`);
  };

  const handleModify = async () => {
    if (!(await validate())) {
      return;
    }

    await WinkApi.Activity.StudyAdmin.updateCategory({
      categoryId: modifyModal!._id,
      category: values.category,
    });
    await fetchCategories();

    setModifyModal(null);
    setValues({ category: '' });
    setErrors({ category: '' });

    toast.success(
      `"${modifyModal?.name}" 카테고리를 "${values.category}" 카테고리로 수정했습니다.`,
    );
  };

  const handleDelete = async () => {
    if (!deleteModal) return;

    await WinkApi.Activity.StudyAdmin.deleteCategory({ categoryId: deleteModal._id });
    await fetchCategories();

    toast.warn(`"${deleteModal.name}" 카테고리가 삭제되었습니다.`);

    setDeleteModal(null);
  };

  return (
    <div className="container mx-auto mt-4">
      <Title title="Activity" subtitle="스터디 - 카테고리" />

      <div className="flex justify-end mb-4 space-x-4">
        <IconButton
          icon={<FaEdit />}
          text="카테고리 추가"
          className="bg-wink-500 hover:bg-wink-600 border-0 text-white"
          onClick={() => setCreateModal(true)}
        />
      </div>

      <div className="min-w-full grid grid-cols-12 gap-2 border-b">
        <div className="pt-4 py-2 px-4 col-span-8 text-left text-sm font-semibold text-gray-600">
          이름
        </div>
        <div className="pt-4 py-2 px-4 col-span-2 text-left text-sm font-semibold text-gray-600">
          의존성
        </div>
        <div className="pt-4 py-2 px-4 col-span-1 text-left text-sm font-semibold text-gray-600">
          수정
        </div>
        <div className="pt-4 py-2 px-4 col-span-1 text-left text-sm font-semibold text-gray-600">
          삭제
        </div>
      </div>

      {categories.map((category) => (
        <div key={category._id} className="grid grid-cols-12 gap-2 border-b border-gray-200">
          <div className="py-4 px-4 col-span-8 text-sm">{category.name}</div>
          <div className="py-4 px-4 col-span-2 text-sm">{category.dependencies}개</div>
          <div className="col-span-1 flex items-center justify-center space-x-8">
            <FaEdit
              size={18}
              className="cursor-pointer"
              onClick={() => {
                setModifyModal(category);
                setValues({ category: category.name });
                setErrors({ category: '' });
              }}
            />
          </div>
          <div className="col-span-1 flex items-center justify-center space-x-8">
            <FaTrashCan
              size={18}
              className="cursor-pointer"
              onClick={() => setDeleteModal(category)}
            />
          </div>
        </div>
      ))}

      <Modal isOpen={createModal} onClose={() => setCreateModal(false)}>
        <h2 className="text-xl font-bold mb-4">카테고리 추가</h2>

        <FormContainer values={values} errors={errors} onChange={onChange}>
          <div className="flex items-center gap-2.5">
            <TextField
              type="text"
              id="category"
              placeholder="카테고리 이름을 입력해주세요."
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

      <Modal isOpen={!!modifyModal} onClose={() => setModifyModal(null)}>
        <h2 className="text-xl font-bold mb-4">카테고리 변경</h2>

        <FormContainer values={values} errors={errors} onChange={onChange}>
          <div className="flex items-center gap-2.5">
            <TextField
              type="text"
              id="category"
              placeholder="카테고리 이름을 입력해주세요."
              className="p-2 text-sm border"
            />
          </div>
        </FormContainer>

        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-wink-500 hover:bg-wink-600 text-white rounded-md"
            onClick={handleModify}
          >
            변경
          </button>

          <button
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-600 rounded-md ml-2"
            onClick={() => setModifyModal(null)}
          >
            취소
          </button>
        </div>
      </Modal>

      <Modal isOpen={!!deleteModal} onClose={() => setDeleteModal(null)}>
        <h2 className="text-xl font-bold mb-4">정말로 삭제하시겠습니까?</h2>
        <p>{deleteModal?.name}</p>
        {deleteModal && deleteModal.dependencies > 0 && (
          <p className="mt-2">
            이 카테고리를 삭제하면{' '}
            <strong>{deleteModal.dependencies}개의 스터디가 모두 삭제</strong>됩니다.
          </p>
        )}
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
    </div>
  );
};

export default AdminActivityStudyCategoryPage;
