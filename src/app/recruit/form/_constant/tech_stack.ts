import {
  BackendTechStack,
  DesignTechStack,
  DevOpsTechStack,
  FrontendTechStack,
} from '@/api/type/schema/recruit-form';

interface TechStacks {
  [name: string]: (FrontendTechStack | BackendTechStack | DevOpsTechStack | DesignTechStack)[];
}

export const frontendTechStacks: TechStacks = {
  '기본 웹 기술': [
    FrontendTechStack.HTML,
    FrontendTechStack.CSS,
    FrontendTechStack.JAVASCRIPT,
    FrontendTechStack.TYPESCRIPT,
  ],
  'CSS 전처리기/프레임워크': [
    FrontendTechStack.SCSS,
    FrontendTechStack.SASS,
    FrontendTechStack.TAILWIND_CSS,
    FrontendTechStack.BOOTSTRAP,
    FrontendTechStack.MATERIAL_UI,
    FrontendTechStack.STYLED_COMPONENT,
    FrontendTechStack.EMOTION,
  ],
  '프레임워크/라이브러리': [
    FrontendTechStack.REACT,
    FrontendTechStack.VUE,
    FrontendTechStack.ANGULAR,
    FrontendTechStack.SVELTE,
    FrontendTechStack.NEXT_JS,
    FrontendTechStack.NUXT_JS,
    FrontendTechStack.JQUERY,
  ],
  상태관리: [
    FrontendTechStack.REDUX,
    FrontendTechStack.MOBX,
    FrontendTechStack.RECOIL,
    FrontendTechStack.ZUSTAND,
    FrontendTechStack.CONTEXT_API,
    FrontendTechStack.JOTAI,
  ],
  테스팅: [
    FrontendTechStack.JEST,
    FrontendTechStack.TESTING_LIBRARY,
    FrontendTechStack.CYPRESS,
    FrontendTechStack.STORYBOOK,
  ],
  API: [
    FrontendTechStack.GRAPHQL,
    FrontendTechStack.REACT_QUERY,
    FrontendTechStack.APOLLO_CLIENT,
    FrontendTechStack.SWR,
  ],
};

export const backendTechStacks: TechStacks = {
  언어: [
    BackendTechStack.JAVASCRIPT,
    BackendTechStack.TYPESCRIPT,
    BackendTechStack.JAVA,
    BackendTechStack.PYTHON,
  ],
  프레임워크: [
    BackendTechStack.EXPRESS,
    BackendTechStack.NESTJS,
    BackendTechStack.SPRING_BOOT,
    BackendTechStack.DJANGO,
    BackendTechStack.FLASK,
    BackendTechStack.FASTAPI,
  ],
  데이터베이스: [
    BackendTechStack.MYSQL,
    BackendTechStack.MARIADB,
    BackendTechStack.POSTGRESQL,
    BackendTechStack.MONGODB,
    BackendTechStack.REDIS,
    BackendTechStack.ELASTICSEARCH,
  ],
  ORM: [
    BackendTechStack.TYPEORM,
    BackendTechStack.PRISMA,
    BackendTechStack.SEQUELIZE,
    BackendTechStack.JPA,
    BackendTechStack.HIBERNATE,
  ],
  API: [
    BackendTechStack.GRAPHQL,
    BackendTechStack.REST,
    BackendTechStack.GRPC,
    BackendTechStack.WEBSOCKET,
  ],
  '메시지 큐': [BackendTechStack.KAFKA, BackendTechStack.RABBITMQ],
  인증: [BackendTechStack.JWT, BackendTechStack.OAUTH],
  테스팅: [BackendTechStack.JUNIT, BackendTechStack.JEST],
};

export const devOpsTechStacks: TechStacks = {
  클라우드: [DevOpsTechStack.AWS, DevOpsTechStack.GCP, DevOpsTechStack.AZURE],
  컨테이너: [DevOpsTechStack.DOCKER, DevOpsTechStack.KUBERNETES, DevOpsTechStack.DOCKER_COMPOSE],
  'CI/CD': [
    DevOpsTechStack.JENKINS,
    DevOpsTechStack.GITHUB_ACTIONS,
    DevOpsTechStack.GITLAB_CI,
    DevOpsTechStack.CIRCLE_CI,
  ],
  IaC: [DevOpsTechStack.TERRAFORM, DevOpsTechStack.ANSIBLE],
  '모니터링/로깅': [DevOpsTechStack.PROMETHEUS, DevOpsTechStack.GRAFANA, DevOpsTechStack.ELK_STACK],
  네트워킹: [DevOpsTechStack.NGINX, DevOpsTechStack.APACHE],
};

export const designTechStacks: TechStacks = {
  'UI/UX 디자인': [DesignTechStack.FIGMA, DesignTechStack.SKETCH, DesignTechStack.ADOBE_XD],
  '그래픽 디자인': [DesignTechStack.PHOTOSHOP, DesignTechStack.ILLUSTRATOR],
  프로토타이핑: [DesignTechStack.PROTOPIE, DesignTechStack.FRAMER],
  협업: [DesignTechStack.ZEPLIN, DesignTechStack.INVISION],
};
