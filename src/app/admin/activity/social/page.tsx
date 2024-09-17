'use client';

import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { toast } from 'react-toastify';

import { AdminIconButton, AdminSearchBar, AdminTablePaging, AdminTitle, Modal } from '@/component';

import { SocialType, WinkApi } from '@/api';

import { formatDate } from '@/util';

const AdminActivitySocialPage = () => {
  const [socials, setSocials] = useState<SocialType[]>([]);

  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(0);

  const [query, setQuery] = useState<string>('');

  const [deleteModal, setDeleteModal] = useState<SocialType | null>(null);

  useEffect(() => {
    async function fetchMaxPage() {
      const { page } = await WinkApi.Activity.Social.getSocialsPage();
      setMaxPage(page);
    }

    (async () => {
      await fetchMaxPage();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await fetchSocials();
    })();
  }, [page, query]);

  async function fetchSocials() {
    if (query) {
      const { socials } = await WinkApi.Activity.Social.searchSocials({ query });
      setSocials(socials);
    } else {
      const { socials } = await WinkApi.Activity.Social.getSocials({ page });
      setSocials(socials);
    }
  }

  const handleDelete = async () => {
    if (!deleteModal) return;

    await WinkApi.Activity.SocialAdmin.deleteSocial({ socialId: deleteModal._id });
    await fetchSocials();

    toast.warn(`"${deleteModal.title}" 친목 활동이 삭제되었습니다.`);

    setDeleteModal(null);
  };

  return (
    <div className="container mx-auto mt-4">
      <AdminTitle title="Activity" subtitle="친목 활동" />

      <div className="flex justify-end mb-4 space-x-4">
        <AdminSearchBar value={query} placeholder="제목을 검색해주세요." onChange={setQuery} />

        <AdminIconButton
          icon={<FaEdit />}
          text="친목 활동 추가"
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

      {socials.map((social) => (
        <div key={social._id} className="grid grid-cols-12 gap-2 border-b border-gray-200">
          <div className="py-4 px-4 col-span-7 text-sm truncate">{social.title}</div>
          <div className="py-4 px-4 col-span-3 text-sm">{formatDate(social.createdAt)}</div>
          <div className="col-span-1 flex items-center justify-center space-x-8">
            <FaEdit size={18} className="cursor-pointer" onClick={() => {}} />
          </div>
          <div className="col-span-1 flex items-center justify-center space-x-8">
            <FaTrashCan
              size={18}
              className="cursor-pointer"
              onClick={() => setDeleteModal(social)}
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

      {!query && maxPage > 0 && (
        <AdminTablePaging page={page} setPage={setPage} maxPage={maxPage} />
      )}
    </div>
  );
};

export default AdminActivitySocialPage;
