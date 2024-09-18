import { MemberType } from '@/api';

import { create } from 'zustand';

interface MemberState {
  member: MemberType | null;
  setMember: (member: MemberType | null) => void;
}

export const useMemberStore = create<MemberState>(set => ({
  member: null,
  setMember: (member: MemberType | null) =>
    set(() => ({
      member,
    })),
}));
