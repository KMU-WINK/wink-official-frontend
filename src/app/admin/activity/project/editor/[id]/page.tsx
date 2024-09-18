'use client';

import React, { useEffect } from 'react';
import { FaSave, FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  Editor,
  FormContainer,
  IconButton,
  TextField,
  Title,
} from '@/component';

import { useForm } from '@/hook';

import { WinkApi } from '@/api';

import * as yup from 'yup';

type Inputs = 'title' | 'tags' | 'content' | 'image';

interface AdminActivityProjectEditorPageProps {
  params: { id: string };
}

const AdminActivityProjectEditorPage = ({
  params,
}: AdminActivityProjectEditorPageProps) => {
  const router = useRouter();

  const { values, setValues, errors, onChange, validate } = useForm<
    Inputs,
    string
  >(
    yup.object({
      title: yup
        .string()
        .required('제목을 입력해주세요.')
        .min(4, '제목은 4글자 이상이어야 합니다.'),
      tags: yup.string().required('태그를 입력해주세요.'),
      content: yup.string().required('내용을 입력해주세요.'),
      image: yup.string().required('이미지를 업로드해주세요.'),
    }),
  );

  useEffect(() => {
    if (params.id !== 'new') {
      (async () => {
        const { project } = await WinkApi.Activity.Project.getProject({
          projectId: params.id,
        });

        setValues({
          title: project.title,
          tags: project.tags.join(', '),
          content: project.content,
          image: project.image,
        });
      })();
    }
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const { link } = await WinkApi.Activity.CommonAdmin.upload(file);
      setValues(prev => ({ ...prev, image: link }));
    }
  };

  const handleSave = async () => {
    if (!(await validate())) {
      return;
    }

    if (params.id === 'new') {
      const { project } = await WinkApi.Activity.ProjectAdmin.createProject({
        title: values.title,
        tags: values.tags.split(',').map(tag => tag.trim()),
        content: values.content,
        image: values.image,
      });

      toast.success('프로젝트를 생성했습니다.');

      router.push(`/activity/project/${project._id}`);
    } else {
      await WinkApi.Activity.ProjectAdmin.updateProject({
        projectId: params.id,
        title: values.title,
        tags: values.tags.split(',').map(tag => tag.trim()),
        content: values.content,
        image: values.image,
      });

      toast.success('프로젝트를 수정했습니다.');

      router.push(`/activity/project/${params.id}`);
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <Title title="Activity" subtitle="프로젝트" />

      <div className="mt-1">
        <div className="flex justify-end mb-4">
          <IconButton
            icon={<FaSave />}
            text={params.id === 'new' ? '생성' : '수정'}
            className="bg-wink-500 hover:bg-wink-600 border-0 text-white"
            onClick={handleSave}
          />
        </div>

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        {values.image ? (
          <div
            className="relative h-44 cursor-pointer"
            onClick={() => {
              document.getElementById('fileInput')?.click();
            }}
          >
            <Image
              src={values.image}
              className="rounded-xl"
              layout="fill"
              objectFit="cover"
              alt="image"
            />
          </div>
        ) : (
          <div
            className="flex justify-center items-center h-44 border border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition"
            onClick={() => {
              document.getElementById('fileInput')?.click();
            }}
          >
            <label
              htmlFor="fileInput"
              className="flex flex-col items-center justify-center"
            >
              <FaUpload className="text-4xl text-gray-400 mb-1" size={24} />
              <span className="text-gray-600">Upload Image</span>
            </label>
          </div>
        )}

        <FormContainer values={values} errors={errors} onChange={onChange}>
          <div className="flex flex-col items-center gap-2.5 my-2.5">
            <TextField
              type="text"
              id="title"
              placeholder="프로젝트 이름을 입력해주세요."
              className="p-2 text-sm border"
            />

            <TextField
              type="text"
              id="tags"
              placeholder="태그를 입력해주세요. (,로 구분)"
              className="p-2 text-sm border"
            />
          </div>
        </FormContainer>

        <Editor
          content={values.content}
          setContent={value => setValues(prev => ({ ...prev, content: value }))}
        />
      </div>
    </div>
  );
};

export default AdminActivityProjectEditorPage;
