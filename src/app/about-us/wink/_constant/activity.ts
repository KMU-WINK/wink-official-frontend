import { StaticImageData } from 'next/image';

import LinkImage from '@/public/about-us/wink/activity/link.webp';
import PreCourseImage from '@/public/about-us/wink/activity/precourse.webp';
import WiminarImage from '@/public/about-us/wink/activity/weminar.webp';
import WinkathonImage from '@/public/about-us/wink/activity/winkathon.webp';

interface Activity {
  tag: string;
  title: string;
  description: string;
  image: StaticImageData;
}

export const activity: Activity[] = [
  {
    tag: '윙커톤',
    title: '서로의 우정이 두터워지는\n무박 2일 해커톤 여정',
    description:
      '부원들과 함께 밤을 새며 새로운 서비스를 만들었어요.\n지난 대회에서는 UN 지속가능발전목표를 주제로 총 5개의 서비스를 만들었답니다.',
    image: WinkathonImage,
  },
  {
    tag: '프리코스',
    title: '햇병아리 웹 개발자를 위한\nWINK만의 커리큘럼',
    description: 'WINK 소속 개발자들이 만든 웹 기초 커리큘럼으로 재학생들과 함께 했어요.',
    image: PreCourseImage,
  },
  {
    tag: '위미나',
    title: '현업 개발자 선배님들과\n함께하는 유익한 세미나',
    description: 'WINK 출신의 멋진 선배님들을 초청하여 다양한 주제로 세미나를 진행하고 있어요.',
    image: WiminarImage,
  },
  {
    tag: '연계 활동',
    title: '동아리 대표가 되어볼까요?\n활발한 동아리 연계 활동',
    description:
      '연구실 연계 활동 및 학부 연구생 활동이 활발히 진행되고 있어요.\n소프트웨어 중심대학 관련 사업에도 다양하게 첨여하고 있답니다.',
    image: LinkImage,
  },
];
