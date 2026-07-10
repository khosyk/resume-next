# `/lab/ssr` — Server-Side Rendering 가이드

> **파일:** `src/app/lab/ssr/page.tsx`  
> **전략:** SSR — **요청마다** 서버에서 HTML 생성

---

## 1. 개념 (먼저 읽기)

### SSR이란?

사용자가 URL을 요청할 때마다 **서버에서 React를 렌더**해 HTML 문자열을 만들고, 그걸 브라우저에 보냅니다.

```txt
요청 → Server Component 실행 → HTML → 브라우저
```

### Next.js App Router에서 SSR이 되는 경우

- `page.tsx`가 **async Server Component**이고
- `dynamic`/`fetch` 등으로 **요청 시점 데이터**를 쓰거나
- `export const dynamic = 'force-dynamic'` 등으로 정적화를 끄면

**이 Lab 페이지 목표:** metrics + **요청 시각 `generatedAt`** 이 View Source에 보이게.

### SPA(CSR)와 차이 한 줄

| | SSR | CSR |
|--|-----|-----|
| 첫 HTML | 숫자·텍스트 포함 | 빈 껍데기 + JS |
| View Source | 데이터 있음 | 데이터 없음 |

---

## 2. Live Lab — 무엇을 보여줄까?

최소 구성:

1. **metrics 표** (`portfolioMetrics` 6필드 중 4~6개)
2. **`generatedAt`** — `new Date().toISOString()` (서버에서 매 요청 생성)

예시 UI 카피:

```txt
생성 시각 (서버): 2026-07-10T06:00:00.000Z
```

새로고침할 때마다 **초 단위로 바뀌면** SSR 증명에 유리합니다.

---

## 3. 단계별 구현 (직접 코딩)

### Step 1 — 카피 초안 작성 (한국어)

`LabPageShell`의 `children`에 넣을 마크업 구조:

```tsx
<LabPageShell href="/lab/ssr" strategy="SSR" title="SSR Lab">
  {/* 아래를 직접 작성 */}
  <section>
    <h2>Why</h2>
    <p>...</p>
    <h2>Live Lab</h2>
    {/* metrics + generatedAt */}
    <h2>How</h2>
    <ul>...</ul>
    <h2>Trade-offs</h2>
    <ul>...</ul>
    <h2>Verify</h2>
    <ol>...</ol>
  </section>
</LabPageShell>
```

### Step 2 — Why 작성 (2~3문장)

**채울 질문:**

- SEO/OG/링크 프리뷰에 **첫 HTML**이 왜 중요한가?
- 이 포트폴리오에서 **어떤 섹션**이 SSR 후보인가? (예: 이력서 텍스트)

**예시 (수정해서 사용):**

```txt
검색·SNS 크롤러는 JavaScript 실행 전 첫 HTML만 본다.
그래서 의미 있는 metrics·소개 문구를 서버에서 HTML에 넣으면
JS 없이도 콘텐츠가 전달된다.
```

### Step 3 — Server page 구현

`ssr/page.tsx` 패턴:

```tsx
import { portfolioMetrics } from "@/lib/data/portfolio-metrics";

export const dynamic = "force-dynamic"; // 요청마다 렌더 (Lab 설명용)

export default async function SsrLabPage() {
  const generatedAt = new Date().toISOString();
  // children에 metrics + generatedAt
}
```

**지식:** `force-dynamic`은 “이 페이지는 캐시하지 말고 요청마다 그려라”는 힌트입니다.

### Step 4 — How bullet (3~5개)

파일 경로를 반드시 포함:

```txt
- src/app/lab/ssr/page.tsx — async Server Component
- portfolioMetrics import — lib/data/portfolio-metrics.ts
- generatedAt — 요청 시 서버에서 new Date()
- export const dynamic = 'force-dynamic' — 정적 캐시 비활성
```

### Step 5 — Trade-offs (2개)

```txt
장점: 첫 HTML에 데이터·SEO 친화
단점: TTFB·서버 부하 (트래픽마다 렌더)
```

### Step 6 — Verify (반드시 직접 실행)

1. `yarn dev` → `/lab/ssr` 열기
2. **View Page Source** (Elements가 아님)
3. `0.02` 또는 `550` 등 metrics 숫자 검색
4. `generatedAt` ISO 문자열 검색
5. **새로고침** → `generatedAt` 변경 확인
6. 스크린샷 또는 메모 남기기

---

## 4. 흔한 실수

| 실수 | 결과 |
|------|------|
| `"use client"`를 page에 붙임 | 서버 매 요청 렌더 의도가 흐려짐 |
| View Source 대신 Elements만 봄 | CSR hydration 후 DOM만 보여서 착각 |
| metrics를 Client에서만 fetch | 이 페이지는 SSR Lab이 아니게 됨 |

---

## 5. 면접 한 줄 피치

> “같은 metrics인데 SSR 페이지는 View Source에 숫자와 `generatedAt`이 있고, CSR 페이지는 없습니다. 데이터는 같고 생성 위치만 다릅니다.”

---

## 6. 완료 체크리스트

- [ ] Why / How / Trade-offs / Verify 한국어 작성
- [ ] Live Lab에 metrics + `generatedAt`
- [ ] View Source 검증 완료
- [ ] `yarn verify`

**다음:** [ssg.md](./ssg.md)
