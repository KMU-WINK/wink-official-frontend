'use client';

import React from 'react';

interface AdminTitleProps {
  title: string;
  subtitle: string;
}

export const AdminTitle: React.FC<AdminTitleProps> = ({ title, subtitle }) => {
  return (
    <>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </>
  );
};
