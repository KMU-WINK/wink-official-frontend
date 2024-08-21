import { MyInfoResponseDto } from "@/api/domain/Auth";
import { WinkApiRequest, WinkApiResponse } from "@/api/util/WinkApiRequest";

export class Member {
  constructor(private readonly request: WinkApiRequest) {}

  public async getMembers(): Promise<WinkApiResponse<GetMembersResponseDto>> {
    return this.request.get("/member");
  }

  public async updateMyInfo(
    data: UpdateMyInfoRequestDto,
  ): Promise<WinkApiResponse<void>> {
    return this.request.put("/member/me/info", data);
  }

  public async updateMyPassword(
    data: UpdateMyPasswordRequestDto,
  ): Promise<WinkApiResponse<void>> {
    return this.request.patch("/member/me/password", data);
  }

  public async updateMyAvatar(
    data: UpdateMyAvatarRequestDto,
  ): Promise<WinkApiResponse<UpdateMyAvatarResponseDto>> {
    return this.request.patch("/member/me/avatar", data);
  }

  public async deleteMyAvatar(): Promise<WinkApiResponse<void>> {
    return this.request.delete("/member/me/avatar");
  }
}

export class MemberAdmin {
  constructor(private readonly request: WinkApiRequest) {}

  public async getWaitingMembers(): Promise<
    WinkApiResponse<GetMembersForAdminResponseDto>
  > {
    return this.request.get("/member/admin/waiting");
  }

  public async approveWaitingMember(
    data: ApproveWaitingMemberRequestDto,
  ): Promise<WinkApiResponse<void>> {
    return this.request.post("/member/admin/waiting/approve", data);
  }

  public async rejectWaitingMember(
    data: RejectWaitingMemberRequestDto,
  ): Promise<WinkApiResponse<void>> {
    return this.request.post("/member/admin/waiting/reject", data);
  }

  public async getMembers(): Promise<
    WinkApiResponse<GetMembersForAdminResponseDto>
  > {
    return this.request.get("/member/admin");
  }

  public async updateMemberRole(
    data: UpdateMemberRoleRequestDto,
  ): Promise<WinkApiResponse<void>> {
    return this.request.patch("/member/admin/role", data);
  }

  public async updateMemberFee(
    data: UpdateMemberFeeRequestDto,
  ): Promise<WinkApiResponse<void>> {
    return this.request.patch("/member/admin/fee", data);
  }
}

//////////////////////////////////////////////////////////////////////////

export interface ApproveWaitingMemberRequestDto {
  memberId: string;
}

export interface RejectWaitingMemberRequestDto {
  memberId: string;
}

export interface UpdateMemberFeeRequestDto {
  memberId: string;
  fee: boolean;
}

export interface UpdateMemberRoleRequestDto {
  memberId: string;
  role: RoleString;
}

export interface UpdateMyAvatarRequestDto {
  avatar: any;
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
  memberId: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  avatar: string;
  description: string | null;
  link: MyInfoLinks;
  role: RoleString;
}

export interface EachGetMembersForAdminResponseDto
  extends EachGetMembersResponseDto {
  email: string;
  studentId: string;
  fee: boolean;
}

export interface GetMembersResponseDto {
  members: EachGetMembersResponseDto[];
}

export interface GetMembersForAdminResponseDto {
  members: EachGetMembersForAdminResponseDto[];
}

export interface EachGetWaitingMembersResponseDto {
  memberId: string;
  name: string;
  studentId: string;
}

export interface GetWaitingMembersResponseDto {
  members: EachGetWaitingMembersResponseDto[];
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

// noinspection JSUnusedGlobalSymbols
export enum Role {
  PRESIDENT = "PRESIDENT",
  VICE_PRESIDENT = "VICE_PRESIDENT",
  TREASURY_HEAD = "TREASURY_HEAD",
  TREASURY_ASSISTANT = "TREASURY_ASSISTANT",
  PUBLIC_RELATIONS_HEAD = "PUBLIC_RELATIONS_HEAD",
  PUBLIC_RELATIONS_ASSISTANT = "PUBLIC_RELATIONS_ASSISTANT",
  PLANNING_HEAD = "PLANNING_HEAD",
  PLANNING_ASSISTANT = "PLANNING_ASSISTANT",
  MEMBER = "MEMBER",
}

export type RoleString = keyof typeof Role;

export type User = MyInfoResponseDto;
