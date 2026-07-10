# Lab 구현 TODO

> 마스터 계획: [LAB_PLAN.md](./LAB_PLAN.md)  
> 아키텍처: [ARCHITECTURE.md](./ARCHITECTURE.md)  
> 브랜치: `feat/demo-hub-nextjs`  
> 완료 시 `[x]`로 표시

---

## Phase 0 — 문서·브랜치 ✅

- [x] Self-feedback 의사결정 (`DECISIONS.md`)
- [x] 마스터 계획 (`LAB_PLAN.md`)
- [x] 아키텍처 SSOT (`ARCHITECTURE.md`)
- [x] TODO 체크리스트 (본 파일)
- [x] 브랜치 `feat/demo-hub-nextjs` 생성
- [x] README Lab/Docs 링크

---

## Week 1 — Next 이전 + 메인 살리기 ✅

**목표:** Vite 대비 기능 동일한 `/ko`·`/en` + Lab 진입 골격

### 1.1 Next.js 스캐폴드

- [x] `next`, `@tailwindcss/postcss` 등 의존성 추가
- [x] `next.config.ts`, `postcss.config.mjs`, `tsconfig` Next용 조정
- [x] `src/app/layout.tsx`, `globals.css` (기존 `index.css` 이전)
- [x] `yarn build` 동작 확인

### 1.2 메인 페이지 이전

- [x] `app/[lang]/page.tsx` + `app/[lang]/_components` 섹션 분리
- [x] `/ko` · `/en` SSG + `/` → `/ko` redirect
- [x] `components/`, `lib/` import 경로 (Next colocation)
- [x] `layout.tsx` · `generateMetadata` (title, description, alternates)

### 1.3 환경 변수

- [x] `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (+ Vite 키 fallback)
- [x] `scripts/check-env.mjs` 키 이름 업데이트
- [x] `.env.example` 갱신

### 1.4 Lab 진입

- [x] Nav **Lab** 링크 (`/lab`)
- [x] Hero CTA `Technical Lab →`
- [x] Tech 섹션 Engineering Lab 카드
- [x] `/lab` placeholder 페이지

### 1.5 Week 1 완료 기준

- [x] `/` Next.js로 빌드·동작
- [x] Lab 링크 3곳 + `/lab` placeholder
- [x] Vite 진입 파일 제거 (`main.tsx`, `index.html`, `vite.config.ts`)

### Tooling (ESLint · Prettier · Husky · CI)

- [x] `eslint.config.mjs` — `next/core-web-vitals` + `typescript` + `no-console`
- [x] Prettier (`.prettierrc`, `format:check`)
- [x] Husky pre-commit + lint-staged
- [x] `.github/workflows/ci.yml` — `yarn verify`
- [x] `.vscode/settings.json` — format on save

---

## Week 2 — Lab Hub + 렌더링 4종 (진행 중)

**목표:** SSR/SSG/ISR/CSR 동작 + Why/How/Verify 카피 — **네비·골격 완료, 콘텐츠는 함께 작성**

### 2.1 공통

- [x] `src/app/lab/_lib/routes.ts` — 라우트·prev/next 정의
- [x] `LabHeader` — 상단 탭 네비 (Hub · SSR · … · 3D)
- [x] `LabPageShell` — 전략 뱃지 · prev/next · 콘텐츠 placeholder
- [x] `src/app/lab/layout.tsx`

### 2.2 Hub

- [x] `/lab` — Rendering / Visualization 섹션 카드 네비

### 2.3 페이지 골격 (콘텐츠 TBD)

- [x] `/lab/ssr` · `/lab/ssg` · `/lab/isr` · `/lab/csr`
- [x] `/lab/charts` · `/lab/3d`
- [ ] `lib/data/portfolio-metrics.ts`
- [ ] 각 페이지 Why / How / Trade-offs 카피 (함께 작성)
- [ ] `/api/metrics` — CSR 데모용

---

## Week 3 — Charts + 3D

**목표:** 시각화·WebGL 어필

### 3.1 Charts

- [ ] `yarn add recharts`
- [ ] Before/After Bar, Timeline Line
- [ ] `/lab/charts` — `dynamic(ssr: false)` 적용
- [ ] Why/How (eCharts·RN 경험 연결 문구)

### 3.2 3D

- [ ] `yarn add three @react-three/fiber @react-three/drei`
- [ ] Performance Ring 씬
- [ ] `/lab/3d` — `dynamic(ssr: false)`
- [ ] WebGL 실패 / `prefers-reduced-motion` → 2D fallback

### 3.3 Week 3 완료

- [ ] 모바일 레이아웃 점검
- [ ] Hub ↔ 하위 LabNav 순환

---

## Week 4 — 서버 + SSR + 배포

**목표:** v1 Done Definition 충족

### 4.1 Contact 서버화

- [ ] `POST /api/contact` 또는 Server Action
- [ ] `WEB3FORMS_ACCESS_KEY` 서버 전용
- [ ] `ContactModal` 클라이언트 fetch → `/api/contact`

### 4.2 메인 메타데이터 (Hero·Stats SC 분리는 Week 1~2 완료)

- [x] Hero·Stats Server Component 분리 (`app/[lang]/_components`)
- [ ] OG metadata 보강

### 4.3 정리·배포

- [ ] Vite 관련 파일 제거 (`vite.config.ts`, `index.html`, `main.tsx`)
- [ ] `package.json` scripts 정리
- [x] README Architecture 섹션 (ARCHITECTURE.md 링크)
- [ ] Vercel deploy + URL

---

## v1.5 (선택)

- [ ] `/projects/[slug]` SSG (`generateStaticParams`)
- [ ] dynamic OG image
- [ ] Lab 페이지 영어 카피
- [ ] Chart.js 도넛 1개

---

## v2 Backlog

- [ ] Admin + Auth.js + RBAC
- [ ] ECharts 탭
- [ ] webhook `revalidateTag`
- [ ] `/api/health`

---

## 사용자 확인 대기

| ID  | 질문                              | 기본값                         |
| --- | --------------------------------- | ------------------------------ |
| U2  | Nav 라벨 `Lab`                    | **`Lab` ✅**                   |
| U3  | v1.5 `/projects/[slug]` 포함 여부 | **v1.5로 문서화, Week 4 이후** |

변경 원하면 이슈 또는 PR 코멘트로 알려주세요.
