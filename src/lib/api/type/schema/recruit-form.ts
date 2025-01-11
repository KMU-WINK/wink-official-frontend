import BaseSchema from '@/api/type/schema/base-schema';
import Recruit from '@/api/type/schema/recruit';

export default interface RecruitForm extends BaseSchema {
  recruit: Recruit;
  name: string;
  studentId: string;
  email: string;
  phoneNumber: string;
  jiwonDonggi: string;
  baeugoSipeunJeom: string;
  canInterviewDates: string[];
  github: string;
  frontendTechStacks: FrontendTechStack[];
  backendTechStacks: BackendTechStack[];
  devOpsTechStacks: DevOpsTechStack[];
  designTechStacks: DesignTechStack[];
  favoriteProject: string;
  lastComment: string;
  paperPass: boolean | null;
  interviewPass: boolean | null;
}

export enum Domain {
  FRONTEND = 'FRONTEND',
  BACKEND = 'BACKEND',
  DESIGN = 'DESIGN',
  PM = 'PM',
}

export enum FrontendTechStack {
  HTML = 'HTML',
  CSS = 'CSS',
  SCSS = 'SCSS',
  SASS = 'SASS',
  JAVASCRIPT = 'JAVASCRIPT',

  REACT = 'REACT',
  VUE = 'VUE',
  ANGULAR = 'ANGULAR',
  SVELTE = 'SVELTE',
  NEXT_JS = 'NEXT_JS',
  NUXT_JS = 'NUXT_JS',
  JQUERY = 'JQUERY',

  TAILWIND_CSS = 'TAILWIND_CSS',
  BOOTSTRAP = 'BOOTSTRAP',
  MATERIAL_UI = 'MATERIAL_UI',
  STYLED_COMPONENT = 'STYLED_COMPONENT',

  REDUX = 'REDUX',
  MOBX = 'MOBX',
  RECOIL = 'RECOIL',
  ZUSTAND = 'ZUSTAND',
  CONTEXT_API = 'CONTEXT_API',
}

export enum BackendTechStack {
  EXPRESS = 'EXPRESS',
  NESTJS = 'NESTJS',
  SPRING_BOOT = 'SPRING_BOOT',
  DJANGO = 'DJANGO',
  FLASK = 'FLASK',
  FASTAPI = 'FASTAPI',
  RUBY_ON_RAILS = 'RUBY_ON_RAILS',
  LARAVEL = 'LARAVEL',
  ASP_NET = 'ASP_NET',

  MYSQL = 'MYSQL',
  MARIADB = 'MARIADB',
  POSTGRESQL = 'POSTGRESQL',
  MONGODB = 'MONGODB',
  REDIS = 'REDIS',
}

export enum DevOpsTechStack {
  AWS = 'AWS',
  GCP = 'GCP',
  AZURE = 'AZURE',

  DOCKER = 'DOCKER',
  KUBERNETES = 'KUBERNETES',

  JENKINS = 'JENKINS',
  GITHUB_ACTIONS = 'GITHUB_ACTIONS',
}

export enum DesignTechStack {
  FIGMA = 'FIGMA',
  FRAMER = 'FRAMER',
  SKETCH = 'SKETCH',
  ADOBE_XD = 'ADOBE_XD',
  PHOTOSHOP = 'PHOTOSHOP',
  ILLUSTRATOR = 'ILLUSTRATOR',
}
