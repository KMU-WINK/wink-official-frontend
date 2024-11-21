export const OBJECT_ID_EXPRESSION = /^[0-9a-fA-F]{24}$/;
export const OBJECT_ID_MESSAGE = '올바른 ObjectId가 아닙니다.';

export const PASSWORD_EXPRESSION = /^(?=.*[a-zA-Z])(?=.*\d)\S{8,}$/;
export const PASSWORD_MESSAGE = '비밀번호는 8자 이상의 영문자 및 숫자 조합으로 작성해주세요.';

export const KOOKMIN_EMAIL_EXPRESSION = /^[a-zA-Z0-9._%+-]+@kookmin\.ac\.kr$/;
export const KOOKMIN_EMAIL_MESSAGE = '국민대학교 이메일 형식이 아닙니다.';

export const GITHUB_USERNAME_EXPRESSION = /^(?!-)[a-zA-Z0-9-]{1,39}(?<!-)$/;
export const GITHUB_USERNAME_MESSAGE = '올바른 Github 유저가 아닙니다.';

export const GITHUB_PROJECT_URL_EXPRESSION =
  /^https?:\/\/(?:www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9._-]+\/?$/;
export const GITHUB_PROJECT_URL_MESSAGE = '올바른 Github URL이 아닙니다.';

export const INSTAGRAM_EXPRESSION = /^(?!.*\.\.)(?!.*\.$)[a-zA-Z0-9._]{1,30}$/;
export const INSTAGRAM_MESSAGE = '올바른 Instagram 유저가 아닙니다.';

export const URL_EXPRESSION =
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
export const URL_MESSAGE = '올바른 URL이 아닙니다.';

export const STUDENT_ID_MESSAGE = '올바른 학번이 아닙니다.';

export const PHONE_NUMBER_EXPRESSION = /^(01[016789])-[0-9]{3,4}-[0-9]{4}$/;
export const PHONE_NUMBER_MESSAGE = '올바른 전화번호가 아닙니다.';

export const YYYY_MM_DD_EXPRESSION = /^\d{4}-\d{2}-\d{2}$/;
export const YYYY_MM_DD_MESSAGE = '올바른 날짜가 아닙니다';

export const YYYY_MM_DD_HH_MM_EXPRESSION = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
export const YYYY_MM_DD_HH_MM_MESSAGE = '올바른 날짜 및 시간이 아닙니다';
