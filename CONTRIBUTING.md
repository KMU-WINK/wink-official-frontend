# wink-official-frontend 기여 가이드

## 목차

1. [시작하기](#시작하기)
2. [개발 워크플로우](#개발-워크플로우)
3. [코딩 컨벤션](#코딩-컨벤션)
4. [풀 리퀘스트](#풀-리퀘스트)

## 시작하기

1. **레포지토리 클론:**
    ```bash
    git clone https://github.com/your-username/wink-official-frontend.git
    cd wink-official-frontend
    ```

2. **의존성 설치:**
    ```bash
    yarn install
    ```

## 개발 워크플로우

### 브랜치

- 주요 브랜치는 다음과 같습니다:
    - `master`: 프로덕션 준비가 완료된 브랜치입니다.
    - `develop`: 최신 개발 변경 사항이 포함된 브랜치입니다.

- 새로운 기능을 추가하려면 `develop`에서 새로운 브랜치를 만드세요:
```bash
git checkout develop
git pull origin develop
git checkout -b features/your-feature-name
```

### 코딩 컨벤션

코드 린팅과 포매팅을 위해 ESLint와 Prettier를 사용합니다. 이 컨벤션은 Git hook을 사용하여 자동으로 적용됩니다.

- **린팅:** 다음 명령어를 실행하여 린팅 오류를 확인하세요:
```
yarn lint
```

- **포매팅:** 다음 명령어를 실행하여 코드를 포매팅하세요:
```yarn
yarn format
```

### 커밋 메시지

```
<type>(<scope>): <subject>
```

- **Type:** 변경 유형 (예: `feat`, `fix`, `chore`, `docs` 등)
- **Scope:** 변경 범위 (예: `page`, `component` 등)
- **Subject:** 변경 사항에 대한 설명

## 풀 리퀘스트

1. **브랜치를 GitHub에 푸시:**
    ```bash
    git push origin features/your-feature-name
    ```

2. **리뷰 프로세스:**
   - 모든 체크가 통과했는지 확인하세요.
   - 최소 한 명 이상의 다른 기여자로부터 리뷰를 요청하세요.
   - 피드백을 반영하여 필요한 변경 사항을 수행하세요.
   
3. **풀 리퀘스트 머지:**

- 타겟 브랜치가 `develop`인 경우, "Squash and merge"를 사용하세요.
- 타겟 브랜치가 `master`인 경우, "Rebase and merge"를 사용하세요.
