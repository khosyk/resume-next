# `/lab/csr` — Client-Side Rendering 가이드

> **파일:** `src/app/lab/csr/page.tsx`  
> **선행:** [00-prerequisites.md](./00-prerequisites.md) — `GET /api/metrics`

---

## 1. 개념

### CSR이란?

브라우저가 **빈 HTML(또는 껍데기)** 을 받은 뒤, JavaScript가 실행되면서 **클라이언트에서** 데이터를 가져와 UI를 채웁니다.

```txt
HTML (데이터 없음) → JS 번들 로드 → fetch /api/metrics → 화면 그림
```

### Next.js에서 CSR island

- `page.tsx` 또는 하위 컴포넌트에 `"use client"`
- `useEffect` + `fetch`
- 로딩: skeleton → 데이터 표시

### 언제 쓰나 (이 포트폴리오 맥락)

- 실시간 필터·WebGL(3D)·개인화
- SEO 불필요한 대시보드 UI
- **열달후에** 앱처럼 “이미 로드된 SPA 안” 인터랙션

---

## 2. Live Lab — 무엇을 보여줄까?

1. **초기:** skeleton 또는 “Loading…”
2. **~500ms 후:** `/api/metrics` 응답으로 metrics 표
3. **`fetchedAt`** — API가 준 시각 (클라이언트 표시)

**핵심 증명:** View Source에는 metrics 숫자 **없음**, Network 탭에 `/api/metrics` **있음**.

---

## 3. 단계별 작성

### Step 1 — Why (2~3문장)

**예시:**

```txt
검색이 필요 없고 사용자 인터랙션이 많은 UI는
클라이언트에서 데이터를 가져와 그리는 편이 단순하다.
3D·실시간 필터는 서버 HTML에 넣을 수 없어 CSR 영역이 된다.
```

### Step 2 — 컴포넌트 분리 (권장)

```txt
src/app/lab/_components/CsrMetricsLab.tsx  ("use client")
src/app/lab/csr/page.tsx                   (Server — LabPageShell만)
```

**지식:** page는 Server로 두고 **Live Lab만 Client** → LabPageShell·SEO 제목은 서버 유지.

### Step 3 — Client 로직 스케치

```tsx
"use client";
// useState: data | null, isLoading
// useEffect: fetch("/api/metrics") → setData
// skeleton when isLoading
```

### Step 4 — How bullet

```txt
- CsrMetricsLab.tsx — useEffect + fetch
- GET /api/metrics — 500ms delay BFF
- portfolioMetrics — API JSON body
- page.tsx — Server, View Source에 숫자 없음
```

### Step 5 — Trade-offs

```txt
장점: 실시간·인터랙션·서버 HTML 단순
단점: 첫 페인트 지연, SEO·View Source 빈약, JS 필수
```

### Step 6 — Verify

1. `/lab/csr` 열기
2. **View Page Source** → `0.02`, `550000` 등 **없어야** 함
3. DevTools **Network** → `metrics` 요청 200, ~500ms
4. **Disable JavaScript** (Chrome) → metrics 안 보임 (선택)

### Step 7 — SSR과 짝 비교

같은 metrics, 다른 증거:

| | SSR | CSR |
|--|-----|-----|
| View Source | 숫자 있음 | 없음 |
| Network API | 없음 | `/api/metrics` |

---

## 4. 흔한 실수

| 실수 | 결과 |
|------|------|
| page 전체 `"use client"` | Server/Client 경계 학습 목적 흐림 |
| API 없이 Client에서 metrics import만 | “fetch CSR” 증명 실패 |
| Elements 탭만 확인 | hydration 후라 SSR처럼 보임 |

---

## 5. 완료 체크리스트

- [ ] `/api/metrics` 동작
- [ ] Client Live Lab + skeleton
- [ ] Why / How / Trade-offs / Verify
- [ ] View Source vs Network 검증
- [ ] `yarn verify`

**다음:** [charts.md](./charts.md) (Week 3)
