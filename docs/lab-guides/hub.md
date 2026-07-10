# `/lab` Hub — 작성 가이드

> **파일:** `src/app/lab/page.tsx`  
> **렌더링:** SSG (정적)  
> **역할:** Lab 지도 — 렌더링 4종 + 시각화 2종으로 안내

---

## 1. 이 페이지가 증명하는 것

- Lab 전체 **목차**와 **학습 경로**
- (선택) 렌더링 전략 **한눈 비교표** — 면접 전 30초 브리핑용

Hub 자체는 “한 가지 렌더링 기법” 데모가 아니라 **네비게이션 허브**입니다.

---

## 2. 지식 정리 — Hub는 왜 SSG?

| 질문 | 답 |
|------|-----|
| Hub HTML은 언제 만들어지나? | `yarn build` 시점 |
| 요청마다 바뀌나? | 아니오 (redeploy 전까지 동일) |
| 왜 SSG로 충분? | 카드 링크·소개 문구는 자주 안 바뀜, TTFB 좋음 |

---

## 3. 단계별 작성

### Step 1 — Hero 카피 (이미 일부 있음)

`page.tsx` 상단 `main` 안:

| 요소 | 현재 | 직접 다듬을 것 |
|------|------|----------------|
| eyebrow | Engineering Lab | 유지 또는 한국어 부제 |
| h1 | Lab Hub | **한국어 제목** 예: `Engineering Lab` / `기술 Lab 허브` |
| 설명 문단 | 렌더링 4종… | **2문장**으로 “누가/왜/무엇을” |

**작성 템플릿 (채워 넣기):**

```txt
이 Lab은 [채용 담당자/리뷰어]가 Next.js [렌더링·시각화] 역량을
[코드 없이/짧은 시간에] 확인하도록 만든 [N]개 페이지 모음이다.
각 페이지는 동일한 portfolioMetrics로 [전략만] 다르게 보여 준다.
```

### Step 2 — `LabHubSections` (카드 네비)

`LabNav.tsx`의 `LabHubSections`가 Rendering / Visualization 카드를 그립니다.  
카드 **설명**은 `routes.ts`의 `description` 필드에서 옵니다.

**직접 수정할 파일:** `src/app/lab/_lib/routes.ts`

각 route의 `description`을 한국어 한 줄로:

```txt
/lab/ssr  → "요청 시 서버에서 HTML 생성"
/lab/ssg  → "빌드 시 HTML 고정"
...
```

### Step 3 — (선택) 비교표 추가

`page.tsx`에 `LabHubSections` 아래 섹션 추가:

| | SSR | SSG | ISR | CSR |
|--|-----|-----|-----|-----|
| HTML 생성 | … | … | … | … |
| 이 프로젝트 | `/lab/ssr` | … | … | … |

LAB_PLAN §4 표를 복사해 **한국어 1줄**씩 채우세요.

### Step 4 — Verify

- [ ] `/lab` 접속 시 카드 6개 클릭 가능
- [ ] View Source에 카드 링크 `href="/lab/ssr"` 등 존재
- [ ] redeploy 없이 Hub 문구 변경 시 → **빌드 후에만** 반영 (SSG 특성)

---

## 4. How (이 레포) — 면접용 bullet 초안

- `src/app/lab/page.tsx` — Server Component, 빌드 시 정적 HTML
- `LabHubSections` — `labRoutes` SSOT에서 카드 생성
- `LabHeader` — `layout.tsx`에서 전 페이지 공통 sticky nav

---

## 5. Trade-offs (Hub)

- **장점:** 단순·빠른 TTFB, 링크 구조가 `routes.ts` 한 곳
- **단점:** Hub 카피 변경 시 **재배포** 필요 (ISR 안 씀)

---

## 6. 완료 체크리스트

- [ ] h1·설명 문단 한국어 다듬음
- [ ] `routes.ts` description 한국어
- [ ] (선택) 비교표
- [ ] `yarn verify`

**다음:** [ssr.md](./ssr.md)
