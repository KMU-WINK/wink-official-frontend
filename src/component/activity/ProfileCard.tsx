import React, { useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';

import Image from 'next/image';
import Link from 'next/link';

import { Fields, FormContainer, Modal, TextField } from '@/component';

import { useMemberStore } from '@/store';

import { useForm } from '@/hook';

import { WinkApi } from '@/api';

import avatarImage from '@/public/profile.svg';

import * as yup from 'yup';

interface ProfileCardProps {
  id: string;
  name: string;
  description: string | null;
  avatar: string | null;
  github: string | null;
  instagram: string | null;
  blog: string | null;
  role: string | null;
  onUpdate?: () => void;
}

type Inputs = 'description' | 'github' | 'instagram' | 'blog';

export const ProfileCard: React.FC<ProfileCardProps> = ({
  id,
  role,
  name,
  description,
  avatar,
  github,
  instagram,
  blog,
  onUpdate,
}) => {
  const URL = [
    {
      name: 'github',
      url: github,
    },
    {
      name: 'instagram',
      url: instagram,
    },
    {
      name: 'blog',
      url: blog,
    },
  ];

  const fields: Fields<Inputs>[] = [
    { id: 'description', type: 'text', placeholder: '한 줄 소개' },
    { id: 'github', type: 'url', placeholder: 'Github URL' },
    { id: 'instagram', type: 'url', placeholder: 'Instagram URL' },
    { id: 'blog', type: 'url', placeholder: 'Blog URL' },
  ];

  const { member, setMember } = useMemberStore();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const { values, setValues, errors, onChange, validate } = useForm<Inputs, string>(
    yup.object({
      description: yup.string().optional().max(20, '20자 이내로 입력해주세요.'),
      github: yup.string().optional().url('유효한 URL을 입력해주세요.'),
      instagram: yup.string().optional().url('유효한 URL을 입력해주세요.'),
      blog: yup.string().optional().url('유효한 URL을 입력해주세요.'),
    }),
  );

  useEffect(() => {
    setValues({
      description: member?.description || '',
      github: member?.link.github || '',
      instagram: member?.link.instagram || '',
      blog: member?.link.blog || '',
    });
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      await WinkApi.Member.updateMyAvatar(file);
      const { member } = await WinkApi.Auth.myInfo();

      setMember(member);
      onUpdate?.();
    }
  };

  const handleSaveInfo = async () => {
    if (!(await validate())) {
      return;
    }

    await WinkApi.Member.updateMyInfo({
      description: values.description === '' ? null : values.description,
      github: values.github === '' ? null : values.github,
      instagram: values.instagram === '' ? null : values.instagram,
      blog: values.blog === '' ? null : values.blog,
    });
    const { member } = await WinkApi.Auth.myInfo();

    setMember(member);
    onUpdate?.();

    setModalOpen(false);
  };

  return (
    <div className="relative w-72 border border-wink-400 rounded-lg">
      {member?._id === id && (
        <div className="absolute top-4 right-4">
          <FaEdit className="text-gray-400 cursor-pointer" onClick={() => setModalOpen(true)} />
        </div>
      )}

      {role && (
        <div className="absolute -top-3 left-5 bg-white px-3 py-0.5 rounded-full border border-wink-400 text-sm font-bold">
          {role}
        </div>
      )}

      <div className="flex space-x-2 p-4">
        <Image
          src={avatar || avatarImage}
          alt="Profile"
          width={32}
          height={32}
          className="w-16 h-16 object-cover rounded-full"
        />
        <div className="flex flex-col">
          <h2 className="text-lg font-bold mt-1.5">{name}</h2>
          {description && <p className="w-44 text-gray-600 truncate">{description}</p>}
        </div>
      </div>

      <div className="flex justify-around border-t border-wink-400 py-3 px-5">
        {URL.map((url) => (
          <Link
            key={url.name}
            href={url.url || ''}
            aria-disabled={!url.url}
            className="text-blue-600 font-roboto font-bold italic uppercase aria-disabled:cursor-default aria-disabled:text-wink-200"
          >
            {url.name}
          </Link>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">내 프로필 수정</h2>
        <div className="flex flex-col gap-2">
          {member?._id === id && (
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e)}
              className="hidden"
            />
          )}

          <Image
            src={avatar || avatarImage}
            alt="Profile"
            width={48}
            height={48}
            className={`w-24 h-24 object-cover rounded-full self-center ${member?._id === id ? 'cursor-pointer' : ''}`}
            onClick={() => {
              if (member?._id !== id) {
                return;
              }

              document.getElementById('fileInput')?.click();
            }}
          />

          <FormContainer values={values} errors={errors} onChange={onChange}>
            {fields.map(({ id, ...rest }) => (
              <div key={id}>
                <label htmlFor={id} className="text-sm">
                  {rest.placeholder}
                </label>
                <TextField
                  id={id}
                  className="px-3 py-2.5 border border-border rounded focus:outline-none focus:ring-1 focus:ring-wink-300 placeholder-gray-600"
                  {...rest}
                />
              </div>
            ))}
          </FormContainer>

          <button
            className="w-fit mt-4 px-8 py-2 bg-wink-500 hover:bg-wink-600 text-white rounded-md self-center"
            onClick={handleSaveInfo}
          >
            저장
          </button>
        </div>
      </Modal>
    </div>
  );
};
