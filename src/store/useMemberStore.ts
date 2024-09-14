import { create } from 'zustand';

import { MemberType } from '@/api';

interface MemberState {
  member: MemberType | null;
  setMember: (member: MemberType | null) => void;
}

export const useMemberStore = create<MemberState>((set) => ({
  member: null,
  setMember: (member: MemberType | null) =>
    set(() => ({
      member,
    })),
}));
