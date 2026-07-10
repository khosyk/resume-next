# Step 0 — 선행 작업 (데이터·API)

> **이 단계를 건너뛰면** SSR/SSG/ISR/CSR 페이지에 넣을 Live Lab 내용이 비어 있거나, 숫자가 홈 Stats와 어긋납니다.

---

## 1. 왜 먼저 하나?

Lab 렌더링 4종의 핵심 메시지:

> **데이터는 같고, HTML을 만드는 시점·장소만 다르다.**

그래서 **한 곳(`portfolio-metrics`)에서 숫자를 읽고**, 각 페이지는 **그걸 어떻게 HTML에 넣는지**만 다르게 보여 줍니다.

---

## 2. Step 0-A — `portfolio-metrics.ts` 만들기

### 목표 파일

```txt
src/lib/data/portfolio-metrics.ts
```

### 타입·필드 (LAB_PLAN §6과 동일)

```ts
export const portfolioMetrics = {
  crashRate: { before: 3.89, after: 0.02, unit: "%" },
  fps: { before: 40, after: 60 },
  qaPass: { before: 60, after: 100, unit: "%" },
  codeReduction: 20,
  users: 550_000,
  mau: 100_000,
} as const;
```

### 지식 포인트

- **SSOT (Single Source of Truth):** 면접·Lab·홈 Stats가 같은 숫자를 말해야 “신뢰”가 생깁니다.
- `as const` — 리터럴 타입 고정, 실수로 값 덮어쓰기 방지.

### 검증

- [ ] `StatsSection`이 이 파일을 import하도록 바꿨는가? (또는 곧 바꿀 예정인가?)
- [ ] 홈 `/ko` Stats에 보이는 4개 숫자와 export 값이 일치하는가?

### 직접 해보기 (카피 없음, 코드만)

1. 파일 생성 → export
2. `StatsSection`에서 `value="0.02%"` 하드코딩 제거 → metrics 참조
3. `yarn verify`

---

## 3. Step 0-B — `/api/metrics` (CSR 전용)

### 목표 파일

```txt
src/app/api/metrics/route.ts
```

### 동작 스펙 (LAB_PLAN)

- `GET` only
- 응답 body: `portfolioMetrics` + `fetchedAt` (ISO 문자열)
- **의도적 `delay` 500ms** — CSR에서 로딩·스켈레톤을 보여 주기 위함

### 지식 포인트

| 용어 | 의미 |
|------|------|
| **Route Handler** | `app/api/.../route.ts` — Next 서버의 HTTP 엔드포인트 |
| **BFF** | Backend For Frontend — 브라우저가 직접 DB가 아니라 Next API를 호출 |
| CSR Lab | 첫 HTML에는 데이터 없음 → JS 실행 후 fetch로 채움 |

### 검증

```bash
yarn dev
curl http://localhost:3000/api/metrics
```

- [ ] JSON에 metrics + `fetchedAt`
- [ ] 응답이 ~500ms 이후 도착 (체감)

---

## 4. Step 0-C — (선택) 공용 UI 조각

렌더링 4페이지에서 metrics 표를 반복하지 않으려면:

```txt
src/app/lab/_components/MetricsTable.tsx   # Server OK
src/app/lab/_components/MetricsSkeleton.tsx # CSR용 Client
```

Week 2에서는 **페이지마다 인라인**해도 되고, 중복이 거슬리면 추출하세요.

---

## 5. Step 0 완료 기준

- [ ] `lib/data/portfolio-metrics.ts` 존재
- [ ] `GET /api/metrics` 동작 (CSR 가이드 전 필수)
- [ ] 문서 [ssr.md](./ssr.md)로 이동할 준비 완료

---

**다음:** [hub.md](./hub.md) (Hub 카피) 또는 바로 [ssr.md](./ssr.md) (구현 집중)
