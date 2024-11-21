import { IconType } from 'react-icons';
import {
  SiAmazonwebservices,
  SiAngular,
  SiDjango,
  SiDocker,
  SiExpress,
  SiGithub,
  SiGithubactions,
  SiKubernetes,
  SiLaravel,
  SiNestjs,
  SiNextdotjs,
  SiReact,
  SiSpring,
  SiSvelte,
  SiVuedotjs,
} from 'react-icons/si';

interface TechStack {
  icon: IconType;
  color: string;
}

export const techStack: TechStack[][] = [
  [
    { icon: SiReact, color: '#61DAFB' },
    { icon: SiNextdotjs, color: '#000000' },
    { icon: SiVuedotjs, color: '#4FC08D' },
    { icon: SiAngular, color: '#DD0031' },
    { icon: SiSvelte, color: '#FF3E00' },
  ],
  [
    { icon: SiSpring, color: '#6DB33D' },
    { icon: SiExpress, color: '#000000' },
    { icon: SiNestjs, color: '#E0234E' },
    { icon: SiDjango, color: '#092E20' },
    { icon: SiLaravel, color: '#FF2D20' },
  ],
  [
    { icon: SiGithub, color: '#181717' },
    { icon: SiAmazonwebservices, color: '#FF9900' },
    { icon: SiGithubactions, color: '#2088FF' },
    { icon: SiDocker, color: '#2496ED' },
    { icon: SiKubernetes, color: '#326CE5' },
  ],
];
