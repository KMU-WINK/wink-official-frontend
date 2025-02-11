import BaseSchema from '@/api/type/schema/base-schema';
import Recruit from '@/api/type/schema/recruit';

export default interface RecruitForm extends BaseSchema {
  recruit: Recruit;
  name: string;
  studentId: string;
  department: string;
  email: string;
  phoneNumber: string;
  jiwonDonggi: string;
  selfIntroduce: string;
  outings: string[];
  interviewDates: string[];
  whyCannotInterview: string;
  github: string;
  frontendTechStacks: FrontendTechStack[];
  backendTechStacks: BackendTechStack[];
  devOpsTechStacks: DevOpsTechStack[];
  designTechStacks: DesignTechStack[];
  favoriteProject: string;
  paperPass: boolean | null;
  interviewPass: boolean | null;
}

export enum FrontendTechStack {
  HTML = 'HTML',
  CSS = 'CSS',
  JAVASCRIPT = 'JavaScript',
  TYPESCRIPT = 'TypeScript',

  SCSS = 'SCSS',
  SASS = 'SASS',
  TAILWIND_CSS = 'Tailwind CSS',
  BOOTSTRAP = 'Bootstrap',
  MATERIAL_UI = 'Material-UI',
  STYLED_COMPONENT = 'Styled Component',
  EMOTION = 'Emotion',

  REACT = 'React',
  VUE = 'Vue.js',
  ANGULAR = 'Angular',
  SVELTE = 'Svelte',
  NEXT_JS = 'Next.js',
  NUXT_JS = 'Nuxt.js',
  JQUERY = 'jQuery',

  REDUX = 'Redux',
  MOBX = 'MobX',
  RECOIL = 'Recoil',
  ZUSTAND = 'Zustand',
  CONTEXT_API = 'Context API',
  JOTAI = 'Jotai',

  JEST = 'Jest',
  TESTING_LIBRARY = 'Testing Library',
  CYPRESS = 'Cypress',
  STORYBOOK = 'Storybook',

  GRAPHQL = 'GraphQL',
  REACT_QUERY = 'React Query',
  APOLLO_CLIENT = 'Apollo Client',
  SWR = 'SWR',
}

export enum BackendTechStack {
  JAVASCRIPT = 'JavaScript',
  TYPESCRIPT = 'TypeScript',
  JAVA = 'Java',
  PYTHON = 'Python',

  EXPRESS = 'Express',
  NESTJS = 'Nest.js',
  SPRING_BOOT = 'Spring Boot',
  DJANGO = 'Django',
  FLASK = 'Flask',
  FASTAPI = 'FastAPI',

  MYSQL = 'MySQL',
  MARIADB = 'MariaDB',
  POSTGRESQL = 'PostgreSQL',
  MONGODB = 'MongoDB',
  REDIS = 'Redis',
  ELASTICSEARCH = 'Elasticsearch',

  TYPEORM = 'TypeORM',
  PRISMA = 'Prisma',
  SEQUELIZE = 'Sequelize',
  JPA = 'JPA',
  HIBERNATE = 'Hibernate',

  GRAPHQL = 'GraphQL',
  REST = 'REST',
  GRPC = 'gRPC',
  WEBSOCKET = 'WebSocket',

  KAFKA = 'Apache Kafka',
  RABBITMQ = 'RabbitMQ',

  JWT = 'JWT',
  OAUTH = 'OAuth',

  JUNIT = 'JUnit',
  JEST = 'Jest',
}

export enum DevOpsTechStack {
  AWS = 'Amazon Web Service',
  GCP = 'Google Cloud Platform',
  AZURE = 'Microsoft Azure',

  DOCKER = 'Docker',
  KUBERNETES = 'Kubernetes',
  DOCKER_COMPOSE = 'Docker Compose',

  JENKINS = 'Jenkins',
  GITHUB_ACTIONS = 'GitHub Actions',
  GITLAB_CI = 'Gitlab CI',
  CIRCLE_CI = 'CircleCI',

  TERRAFORM = 'Terraform',
  ANSIBLE = 'Ansible',

  PROMETHEUS = 'Prometheus',
  GRAFANA = 'Grafana',
  ELK_STACK = 'ELK Stack',

  NGINX = 'NGINX',
  APACHE = 'Apache',
}

export enum DesignTechStack {
  FIGMA = 'Figma',
  FRAMER = 'Framer',
  SKETCH = 'Sketch',
  ADOBE_XD = 'Adobe XD',
  PHOTOSHOP = 'Adobe Photoshop',
  ILLUSTRATOR = 'Adobe Illustrator',
  PROTOPIE = 'ProtoPie',
  ZEPLIN = 'Zeplin',
  INVISION = 'InVision',
}
