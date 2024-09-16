import { WinkApiRequest } from '@/api';

export class Member {
  constructor(private readonly request: WinkApiRequest) {}

  public async getMembers(): Promise<GetMembersResponseDto> {
    return this.request.get('/member');
  }

  public async updateMyInfo(data: UpdateMyInfoRequestDto): Promise<void> {
    return this.request.put('/member/me/info', data);
  }

  public async updateMyPassword(data: UpdateMyPasswordRequestDto): Promise<void> {
    return this.request.patch('/member/me/password', data);
  }

  public async updateMyAvatar(avatar: File): Promise<UpdateMyAvatarResponseDto> {
    const data = new FormData();
    data.append('avatar', avatar);

    return this.request.patch('/member/me/avatar', data);
  }

  public async deleteMyAvatar(): Promise<void> {
    return this.request.delete('/member/me/avatar');
  }
}

export class MemberAdmin {
  constructor(private readonly request: WinkApiRequest) {}

  public async getWaitingMembers(): Promise<GetWaitingMembersResponseDto> {
    return this.request.get('/admin/member/waiting');
  }

  public async approveWaitingMember(data: ApproveWaitingMemberRequestDto): Promise<void> {
    return this.request.post('/admin/member/waiting/approve', data);
  }

  public async rejectWaitingMember(data: RejectWaitingMemberRequestDto): Promise<void> {
    return this.request.post('/admin/member/waiting/reject', data);
  }

  public async getMembersPage(): Promise<GetMembersForAdminPageResponseDto> {
    return this.request.get('/admin/member/max');
  }

  public async getMembers(
    data: GetMembersForAdminRequestDto,
  ): Promise<GetMembersForAdminResponseDto> {
    return this.request.get('/admin/member?page=' + data.page);
  }

  public async searchMembers(data: SearchMembersRequestDto): Promise<SearchMembersResponseDto> {
    return this.request.get('/admin/member/search?query=' + data.query);
  }

  public async updateMemberRole(data: UpdateMemberRoleRequestDto): Promise<void> {
    return this.request.patch('/admin/member/role', data);
  }

  public async updateMemberFee(data: UpdateMemberFeeRequestDto): Promise<void> {
    return this.request.patch('/admin/member/fee', data);
  }
}

//////////////////////////////////////////////////////////////////////////

export interface ApproveWaitingMemberRequestDto {
  memberId: string;
}

export interface RejectWaitingMemberRequestDto {
  memberId: string;
}

export interface GetMembersForAdminRequestDto {
  page: number;
}

export interface SearchMembersRequestDto {
  query: string;
}

export interface UpdateMemberFeeRequestDto {
  memberId: string;
  fee: boolean;
}

export interface UpdateMemberRoleRequestDto {
  memberId: string;
  role: RoleString;
}

export interface UpdateMyInfoRequestDto {
  description: string | null;
  github: string | null;
  instagram: string | null;
  blog: string | null;
}

export interface UpdateMyPasswordRequestDto {
  password: string;
  newPassword: string;
}

//////////////////////////////////////////////////////////////////////////

export interface EachGetMembersResponseDto {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  avatar: string;
  description: string | null;
  link: MyInfoLinks;
  role: RoleString;
}

export interface EachGetMembersForAdminResponseDto extends EachGetMembersResponseDto {
  email: string;
  studentId: string;
  fee: boolean;
}

export interface GetMembersResponseDto {
  members: EachGetMembersResponseDto[];
}

export interface GetMembersForAdminPageResponseDto {
  page: number;
}

export interface GetMembersForAdminResponseDto {
  members: EachGetMembersForAdminResponseDto[];
}

export interface EachGetWaitingMembersResponseDto {
  _id: string;
  name: string;
  studentId: string;
}

export interface GetWaitingMembersResponseDto {
  members: EachGetWaitingMembersResponseDto[];
}

export interface SearchMembersResponseDto {
  members: EachGetMembersForAdminResponseDto[];
}

export interface UpdateMyAvatarResponseDto {
  avatar: string;
}

//////////////////////////////////////////////////////////////////////////

export interface MyInfoLinks {
  github: string | null;
  instagram: string | null;
  blog: string | null;
}

export enum Role {
  PRESIDENT = 'PRESIDENT',
  VICE_PRESIDENT = 'VICE_PRESIDENT',
  TREASURY_HEAD = 'TREASURY_HEAD',
  TREASURY_ASSISTANT = 'TREASURY_ASSISTANT',
  PUBLIC_RELATIONS_HEAD = 'PUBLIC_RELATIONS_HEAD',
  PUBLIC_RELATIONS_ASSISTANT = 'PUBLIC_RELATIONS_ASSISTANT',
  PLANNING_HEAD = 'PLANNING_HEAD',
  PLANNING_ASSISTANT = 'PLANNING_ASSISTANT',
  MEMBER = 'MEMBER',
}

export type RoleString = keyof typeof Role;

export const RoleKoreanMap: Record<RoleString, string> = {
  PRESIDENT: '회장',
  VICE_PRESIDENT: '부회장',
  TREASURY_HEAD: '총무부 부장',
  TREASURY_ASSISTANT: '총무부 차장',
  PUBLIC_RELATIONS_HEAD: '홍보부 부장',
  PUBLIC_RELATIONS_ASSISTANT: '홍보부 차장',
  PLANNING_HEAD: '기획부 부장',
  PLANNING_ASSISTANT: '기획부 차장',
  MEMBER: '부원',
};

export const RoleKorean = Object.values(RoleKoreanMap);

export const RoleKoreanToRole = (role: string): Role => {
  const key = Object.keys(RoleKoreanMap).find((key) => RoleKoreanMap[key as RoleString] === role);
  return Role[key as RoleString];
};

export interface MemberType {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  studentId: string;
  email: string;
  avatar: string | null;
  description: string | null;
  link: MyInfoLinks;
  role: RoleString;
  fee: boolean;
  approved: boolean;
}
