# `/lab/ssg` — Static Site Generation 가이드

> **파일:** `src/app/lab/ssg/page.tsx`  
> **전략:** SSG — **빌드 시** HTML 생성, 이후 CDN/캐시로 제공

---

## 1. 개념

### SSG란?

`yarn build` 할 때 Next가 페이지 HTML을 **미리** 만들어 둡니다.  
런타임 요청은 **이미 만들어진 파일**을 돌려줍니다.

```txt
build → HTML 파일 생성 → deploy → 사용자 요청 → 캐시된 HTML
```

### 이 레포에서 SSG 예시

- `/ko`, `/en` — `generateStaticParams`
- `/lab` Hub — 기본 정적
- **`/lab/ssg`** — Lab에서 “순수 SSG”를 설명하는 페이지

### SSR과 비교

| | SSG | SSR |
|--|-----|-----|
| HTML 생성 시점 | build | every request |
| `generatedAt` 매 요청 변경 | ✗ (build 시 1번) | ✓ |
| TTFB | 보통 더 좋음 | 서버 작업 포함 |

---

## 2. Live Lab — 무엇을 보여줄까?

1. **metrics 표** (동일 SSOT)
2. **`builtAt`** — 빌드 시각 (빌드마다 1번만 바뀜)

`builtAt` 얻는 방법 (택 1):

```tsx
// A) 빌드 시 env (next.config 또는 build script)
process.env.BUILD_TIME

// B) 모듈 스코프 상수 (해당 모듈이 빌드 시 평가됨)
const builtAt = new Date().toISOString();
```

**Lab 의도:** `builtAt`은 **로컬에서 새로고침해도 안 바뀜** → redeploy/build 후에만 변경.

---

## 3. 단계별 작성

### Step 1 — Why (2~3문장)

**질문에 답하기:**

- 이력서·Lab Hub처럼 **자주 안 바뀌는** 콘텐츠에 왜 SSG?
- CDN·엣지 캐시와 TTFB 관계?

**예시:**

```txt
자주 바뀌지 않는 소개·문서는 빌드 시 HTML로 고정하면
서버 렌더 비용 없이 빠르게 전달할 수 있다.
이 포트폴리오 메인과 Lab Hub가 같은 이유로 정적에 가깝다.
```

### Step 2 — page 구현 방향

- **Server Component** 유지 (`"use client"` 없음)
- `export const dynamic = "force-static"` (명시 optional, 기본이 정적일 수 있음)
- `revalidate` **없음** (ISR과 구분)

### Step 3 — How bullet

```txt
- src/app/lab/ssg/page.tsx — 빌드 시 HTML
- portfolioMetrics — 빌드 타임에 HTML에 bake-in
- builtAt — build 시 한 번 기록
- (대비) /lab/ssr 은 force-dynamic
```

### Step 4 — Trade-offs

```txt
장점: TTFB·비용·단순 배포 (정적 호스팅)
단점: 콘텐츠 변경 시 rebuild·redeploy 필요
```

### Step 5 — Verify

1. `yarn build && yarn start` (dev가 아닌 **production**이 더 명확)
2. `/lab/ssg` View Source → metrics + `builtAt` 확인
3. **새로고침 10회** → `builtAt` **동일**해야 함
4. 코드 한 줄 수정 → `yarn build` 다시 → `builtAt` 변경 확인

---

## 4. SSR 페이지와 짝으로 보기

같은 날 테스트:

| 페이지 | 새로고침 시 시간 필드 |
|--------|----------------------|
| `/lab/ssr` | `generatedAt` 매번 변경 |
| `/lab/ssg` | `builtAt` 고정 |

이 차이를 Hub 비교표·면접 스토리에 넣으세요.

---

## 5. 완료 체크리스트

- [ ] Why / How / Trade-offs / Verify 작성
- [ ] `builtAt` 표시
- [ ] refresh vs rebuild 검증
- [ ] `yarn verify`

**다음:** [isr.md](./isr.md)
