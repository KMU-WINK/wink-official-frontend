import {
  BackendTechStack,
  DesignTechStack,
  DevOpsTechStack,
  FrontendTechStack,
} from '@/api/type/schema/recruit-form';

interface TechStack {
  name: string;
  raw: FrontendTechStack | BackendTechStack | DevOpsTechStack | DesignTechStack;
}

export const frontendTechStacks: TechStack[] = [
  {
    name: 'HTML',
    raw: FrontendTechStack.HTML,
  },
  {
    name: 'CSS',
    raw: FrontendTechStack.CSS,
  },
  {
    name: 'SCSS',
    raw: FrontendTechStack.SCSS,
  },
  {
    name: 'SASS',
    raw: FrontendTechStack.SASS,
  },
  {
    name: 'JavaScript',
    raw: FrontendTechStack.JAVASCRIPT,
  },
  {
    name: 'React',
    raw: FrontendTechStack.REACT,
  },
  {
    name: 'Vue.js',
    raw: FrontendTechStack.VUE,
  },
  {
    name: 'Angular',
    raw: FrontendTechStack.ANGULAR,
  },
  {
    name: 'Svelte',
    raw: FrontendTechStack.SVELTE,
  },
  {
    name: 'Next.js',
    raw: FrontendTechStack.NEXT_JS,
  },
  {
    name: 'Nuxt.js',
    raw: FrontendTechStack.NUXT_JS,
  },
  {
    name: 'jQuery',
    raw: FrontendTechStack.JQUERY,
  },
  {
    name: 'Tailwind CSS',
    raw: FrontendTechStack.TAILWIND_CSS,
  },
  {
    name: 'Bootstrap',
    raw: FrontendTechStack.BOOTSTRAP,
  },
  {
    name: 'Material UI',
    raw: FrontendTechStack.MATERIAL_UI,
  },
  {
    name: 'Styled Component',
    raw: FrontendTechStack.STYLED_COMPONENT,
  },
  {
    name: 'Redux',
    raw: FrontendTechStack.REDUX,
  },
  {
    name: 'MobX',
    raw: FrontendTechStack.MOBX,
  },
  {
    name: 'Recoil',
    raw: FrontendTechStack.RECOIL,
  },
  {
    name: 'Zustand',
    raw: FrontendTechStack.ZUSTAND,
  },
  {
    name: 'Context API',
    raw: FrontendTechStack.CONTEXT_API,
  },
];

export const backendTechStacks: TechStack[] = [
  {
    name: 'Express',
    raw: BackendTechStack.EXPRESS,
  },
  {
    name: 'Nest.js',
    raw: BackendTechStack.NESTJS,
  },
  {
    name: 'Spring Boot',
    raw: BackendTechStack.SPRING_BOOT,
  },
  {
    name: 'Django',
    raw: BackendTechStack.DJANGO,
  },
  {
    name: 'Flask',
    raw: BackendTechStack.FLASK,
  },
  {
    name: 'FastAPI',
    raw: BackendTechStack.FASTAPI,
  },
  {
    name: 'Ruby on Rails',
    raw: BackendTechStack.RUBY_ON_RAILS,
  },
  {
    name: 'Laravel',
    raw: BackendTechStack.LARAVEL,
  },
  {
    name: 'ASP.NET',
    raw: BackendTechStack.ASP_NET,
  },
  {
    name: 'MySQL',
    raw: BackendTechStack.MYSQL,
  },
  {
    name: 'MariaDB',
    raw: BackendTechStack.MARIADB,
  },
  {
    name: 'PostgreSQL',
    raw: BackendTechStack.POSTGRESQL,
  },
  {
    name: 'MongoDB',
    raw: BackendTechStack.MONGODB,
  },
  {
    name: 'Redis',
    raw: BackendTechStack.REDIS,
  },
];

export const devOpsTechStacks: TechStack[] = [
  {
    name: 'AWS',
    raw: DevOpsTechStack.AWS,
  },
  {
    name: 'GCP',
    raw: DevOpsTechStack.GCP,
  },
  {
    name: 'Azure',
    raw: DevOpsTechStack.AZURE,
  },
  {
    name: 'Docker',
    raw: DevOpsTechStack.DOCKER,
  },
  {
    name: 'Kubernetes',
    raw: DevOpsTechStack.KUBERNETES,
  },
  {
    name: 'Jenkins',
    raw: DevOpsTechStack.JENKINS,
  },
  {
    name: 'Github Actions',
    raw: DevOpsTechStack.GITHUB_ACTIONS,
  },
];

export const designTechStacks: TechStack[] = [
  {
    name: 'Figma',
    raw: DesignTechStack.FIGMA,
  },
  {
    name: 'Framer',
    raw: DesignTechStack.FRAMER,
  },
  {
    name: 'Sketch',
    raw: DesignTechStack.SKETCH,
  },
  {
    name: 'Adobe XD',
    raw: DesignTechStack.ADOBE_XD,
  },
  {
    name: 'Adobe Photoshop',
    raw: DesignTechStack.PHOTOSHOP,
  },
  {
    name: 'Adobe Illustrator',
    raw: DesignTechStack.ILLUSTRATOR,
  },
];
