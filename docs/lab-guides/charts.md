# `/lab/charts` — Recharts 시각화 가이드

> **파일:** `src/app/lab/charts/page.tsx`  
> **Week:** 3  
> **선행:** [00-prerequisites.md](./00-prerequisites.md) — `portfolio-metrics`  
> **패키지:** `yarn add recharts` (아직 미설치)

---

## 1. 개념

### 왜 차트 Lab이 렌더링 Lab과 다른가?

렌더링 4종은 **HTML 생성 시점**을 비교합니다.  
Charts는 **같은 metrics를 어떻게 “보여 줄 것인가”** — 즉 **FE 시각화 스택**을 증명합니다.

```txt
portfolioMetrics (SSOT)
    ↓
Recharts (Client) → Bar + Line
```

### Recharts를 쓰는 이유 (이 포트폴리오 맥락)

| 경험 | Web 선택 |
|------|----------|
| 열달후에 Admin — Chart.js | Web은 번들·React 친화 고려 |
| 열달후에 — eCharts | 기능 많지만 무거움 |
| **이 Lab** | **Recharts** — React 컴포넌트, 경량, SSR과 분리 쉬움 |

### SSR과의 관계

Recharts는 **DOM + 브라우저 크기**에 의존합니다.  
서버 HTML에 차트를 그리지 않고 **`dynamic(..., { ssr: false })`** 로 Client island에 둡니다.

```txt
Server page → 차트 placeholder/shell
Client island → Recharts 실제 렌더
```

---

## 2. Live Lab — 무엇을 보여줄까?

LAB_PLAN 기준 **차트 2개:**

### Chart A — Before/After Bar

`portfolioMetrics`의 개선 수치:

| 지표 | before | after |
|------|--------|-------|
| crashRate | 3.89% | 0.02% |
| fps | 40 | 60 |
| qaPass | 60% | 100% |

**UI 카피 예:** `품질 지표 Before → After`

### Chart B — Timeline Line (또는 단순 추이)

실제 시계열 DB가 없으므로 **스토리텔링용 합성 데이터** OK:

```txt
월별 crashRate 감소 곡선 (3.89 → 0.02 스토리)
```

**면접 멘트:** “실데이터 API가 아니라 portfolio narrative용 샘플 시리즈입니다.”

---

## 3. 단계별 작성

### Step 1 — 패키지 설치

```bash
yarn add recharts
```

**지식:** Recharts는 `react` peer dependency — 이미 있음.

### Step 2 — Why (2~3문장)

**채울 질문:**

- RN/WebView·Admin에서 쓴 차트 경험을 Web 포트폴리오에 어떻게 연결?
- 왜 ECharts가 아니라 Recharts?

**예시:**

```txt
Admin·앱에서 차트로 지표를 설득한 경험이 있어,
Web Lab에서도 동일한 portfolioMetrics를 Recharts로 시각화한다.
Recharts는 React 컴포넌트 모델과 번들 크기 면에서 이 사이트 v1에 맞다.
```

### Step 3 — 컴포넌트 구조 (권장)

```txt
src/app/lab/_components/ChartsLab.tsx      # "use client" — Recharts
src/app/lab/charts/page.tsx                # Server — LabPageShell + dynamic import
```

`page.tsx` 패턴:

```tsx
import dynamic from "next/dynamic";

const ChartsLab = dynamic(() => import("../_components/ChartsLab"), {
  ssr: false,
  loading: () => <p>차트 로딩 중…</p>,
});

export default function ChartsLabPage() {
  return (
    <LabPageShell href="/lab/charts" strategy="Charts" title="Charts Lab">
      {/* Why, ChartsLab, How, Trade-offs, Verify */}
    </LabPageShell>
  );
}
```

**지식:** `ssr: false` — 서버는 빈 placeholder만, hydration 후 차트.

### Step 4 — ChartsLab 구현 스케치

```tsx
"use client";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { portfolioMetrics } from "@/lib/data/portfolio-metrics";

// barData: crashRate, fps, qaPass before/after
// lineData: 합성 월별 배열
```

**스타일:** `globals.css` / Tailwind 브랜드 색과 맞추기 (`--brand-primary` 등).

### Step 5 — How bullet

```txt
- src/app/lab/charts/page.tsx — dynamic(ssr: false)
- ChartsLab.tsx — Bar + Line, portfolioMetrics
- recharts — ResponsiveContainer로 모바일 대응
- (대비) SSR 페이지는 metrics를 HTML 테이블로 bake-in
```

### Step 6 — Trade-offs

```txt
장점: React 친화, 학습 곡선 낮음, Lab 2차트에 충분
단점: ECharts 대비 고급 차트·대용량 성능 — v1은 2개로 제한
```

### Step 7 — Verify

1. `/lab/charts` — Bar·Line 렌더 확인
2. **View Page Source** — SVG path·차트 데이터 **없음** (또는 loading 문구만)
3. DevTools **Elements** — hydration 후 SVG 존재
4. **모바일 뷰포트** — ResponsiveContainer 깨짐 없음
5. Network — (선택) CSR과 달리 `/api/metrics` **필수 아님** (metrics는 import)

---

## 4. Recharts 핵심 API (학습 메모)

| 컴포넌트 | 역할 |
|----------|------|
| `ResponsiveContainer` | 부모 width 100% |
| `BarChart` / `LineChart` | 차트 타입 |
| `XAxis` / `YAxis` | 축 |
| `Tooltip` | 호버 상세 |
| `data` prop | `{ name, before, after }[]` 형태 배열 |

**데이터 변환 예:**

```ts
const barData = [
  { name: "Crash", before: 3.89, after: 0.02 },
  { name: "FPS", before: 40, after: 60 },
  { name: "QA", before: 60, after: 100 },
];
```

---

## 5. 흔한 실수

| 실수 | 결과 |
|------|------|
| page 전체 `"use client"` | dynamic import 학습 포인트 약화 |
| Recharts를 Server Component에서 직접 import | 빌드/런타임 에러 (window 없음) |
| metrics 숫자를 차트와 테이블에서 다르게 | SSOT 신뢰도 하락 |

---

## 6. 면접 한 줄 피치

> “같은 crashRate·fps 숫자를 SSR 페이지는 HTML 테이블로, Charts Lab은 Recharts Client island로 보여 줍니다. WebGL·차트는 SSR이 불가능해 `dynamic(ssr: false)`로 분리했습니다.”

---

## 7. 완료 체크리스트

- [ ] `yarn add recharts`
- [ ] Bar + Line 2개
- [ ] `dynamic(ssr: false)`
- [ ] Why / How / Trade-offs / Verify
- [ ] `yarn verify`

**다음:** [3d.md](./3d.md)
