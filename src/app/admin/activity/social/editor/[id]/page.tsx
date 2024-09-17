'use client';

import React, { useEffect } from 'react';
import { FaMinus, FaPlus, FaSave, FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Editor, IconButton, TextField, Title } from '@/component';

import { Content, WinkApi } from '@/api';

interface AdminActivitySocialEditorPageProps {
  params: { id: string };
}

const AdminActivitySocialEditorPage = ({ params }: AdminActivitySocialEditorPageProps) => {
  const router = useRouter();
  const [title, setTitle] = React.useState<string>('');
  const [contents, setContents] = React.useState<Content[]>([
    {
      content: '',
      image: '',
    },
  ]);

  useEffect(() => {
    if (params.id !== 'new') {
      (async () => {
        const { social } = await WinkApi.Activity.Social.getSocial({ socialId: params.id });

        setTitle(social.title);
        setContents(social.contents);
      })();
    }
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];

    if (file) {
      const { link } = await WinkApi.Activity.CommonAdmin.upload(file);
      setContents((prev) => {
        prev[index].image = link;
        return [...prev];
      });
    }
  };

  const handleSave = async () => {
    if (params.id === 'new') {
      await WinkApi.Activity.SocialAdmin.createSocial({
        title,
        contents,
      });

      toast.success('친목 활동 생성했습니다.');

      router.push('/activity/social');
    } else {
      await WinkApi.Activity.SocialAdmin.updateSocial({
        socialId: params.id,
        title,
        contents,
      });

      toast.success('친목 활동 수정했습니다.');

      router.push(`/activity/social`);
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <Title title="Activity" subtitle="친목 활동" />

      <div className="mt-1">
        <div className="flex justify-end mb-4 gap-2">
          <IconButton
            icon={<FaPlus />}
            text="페이지 추가"
            className="bg-green-500 hover:bg-green-600 border-0 text-white"
            onClick={() => setContents((prev) => [...prev, { content: '', image: '' }])}
          />

          <IconButton
            icon={<FaMinus />}
            text="페이지 삭제"
            disabled={contents.length === 1}
            className="bg-red-500 hover:bg-red-600 border-0 text-white disabled:bg-gray-300"
            onClick={() => setContents((prev) => prev.slice(0, -1))}
          />

          <IconButton
            icon={<FaSave />}
            text={params.id === 'new' ? '생성' : '수정'}
            className="bg-wink-500 hover:bg-wink-600 border-0 text-white"
            onClick={handleSave}
          />
        </div>

        <div className="flex flex-col items-center gap-2.5 my-2.5">
          <TextField
            type="text"
            id="title"
            value={title}
            placeholder="친목 활동을 입력해주세요."
            className="px-3 py-4 border-border rounded focus:outline-none focus:ring-1 focus:ring-wink-300 placeholder-gray-600 p-2 text-sm border"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {contents.map((content, i) => (
          <div key={i}>
            <input
              id={`fileInput-${i}`}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, i)}
              className="hidden"
            />

            {content.image ? (
              <div
                className="relative h-80 cursor-pointer"
                onClick={() => {
                  document.getElementById(`fileInput-${i}`)?.click();
                }}
              >
                <Image
                  src={content.image}
                  className="rounded-xl"
                  layout="fill"
                  objectFit="cover"
                  alt="image"
                />
              </div>
            ) : (
              <div
                className="flex justify-center items-center h-80 border border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition"
                onClick={() => {
                  document.getElementById(`fileInput-${i}`)?.click();
                }}
              >
                <label htmlFor="fileInput" className="flex flex-col items-center justify-center">
                  <FaUpload className="text-4xl text-gray-400 mb-1" size={24} />
                  <span className="text-gray-600">Upload Image</span>
                </label>
              </div>
            )}

            <div className="mt-2">
              <Editor
                content={content.content}
                setContent={(value) =>
                  setContents((prev) => {
                    prev[i].content = value;
                    return [...prev];
                  })
                }
              />
            </div>

            {i !== contents.length - 1 && <div className="border-b border-gray-200 my-4" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminActivitySocialEditorPage;
