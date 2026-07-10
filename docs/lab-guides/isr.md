# `/lab/isr` — Incremental Static Regeneration 가이드

> **파일:** `src/app/lab/isr/page.tsx`  
> **이미 있음:** `export const revalidate = 60`

---

## 1. 개념

### ISR이란?

**SSG처럼** 먼저 정적 HTML을 만들지만, **일정 시간(`revalidate`) 후** 다음 요청에서 **백그라운드로 HTML을 다시 생성**합니다.

```txt
첫 요청 → 캐시된 HTML (빠름)
60초 지난 뒤 요청 → stale HTML 즉시 + 백그라운드 재생성
그 다음 요청 → 새 HTML
```

### SSG / SSR / ISR 한 줄

| 전략 | freshness | rebuild |
|------|-----------|---------|
| SSG | deploy까지 고정 | 전체 rebuild |
| ISR | 주기적 갱신 | 해당 페이지만 |
| SSR | 매 요청 최신 | 해당 요청마다 |

---

## 2. Live Lab — 무엇을 보여줄까?

1. metrics 표
2. **`regeneratedAt`** (또는 `lastGeneratedAt`) — 페이지 HTML이 **마지막으로 생성된 시각**

구현 패턴:

```tsx
export const revalidate = 60;

export default async function IsrLabPage() {
  const regeneratedAt = new Date().toISOString();
  // ...
}
```

**관찰 포인트:** 같은 60초 창 안에서는 `regeneratedAt`이 같고, **60초+ 지난 뒤 첫 새로고침 이후** 바뀔 수 있음 (캐시·트래픽에 따라 체감이 다를 수 있음 — Verify에 메모).

---

## 3. 단계별 작성

### Step 1 — Why (2~3문장)

**질문:**

- 전체 사이트 rebuild 없이 **일부만** 갱신해야 할 때?
- 블로그·대시보드·Lab metrics “대략 최신”이면 충분할 때?

**예시:**

```txt
모든 deploy 없이 주기적으로 HTML을 갱신하면
운영 데이터·문서를 SSR만큼 비싸지 않게 freshness를 맞출 수 있다.
```

### Step 2 — How bullet

```txt
- export const revalidate = 60 — 60초 ISR 윈도우
- src/app/lab/isr/page.tsx — Server Component
- regeneratedAt — 재생성 시각 표시
- v2: /api/revalidate webhook (LAB_PLAN 보류)
```

### Step 3 — Trade-offs

```txt
장점: SSG 속도 + SSR에 가까운 freshness (주기 한정)
단점: stale-while-revalidate 구간 이해 필요, “실시간”은 아님
```

### Step 4 — Verify (시간이 걸리는 테스트)

1. `yarn build && yarn start`
2. `/lab/isr` View Source → `regeneratedAt` 기록 (메모)
3. **60초 이상 대기** (타이머)
4. 새로고침 → `regeneratedAt` 변경 여부 확인
5. 60초 **이내** 연속 새로고침 → 동일할 수 있음 (정상)

**지식:** ISR은 “정확히 60.000초”보다 **revalidate 정책**으로 이해하는 게 맞습니다.

### Step 5 — SSG·SSR과 대비 메모

| URL | 시간 필드 | 새로고침 |
|-----|-----------|----------|
| ssg | builtAt | 안 바뀜 |
| isr | regeneratedAt | 주기적으로 바뀜 |
| ssr | generatedAt | 매번 바뀜 |

---

## 4. 흔한 실수

- dev 모드(`yarn dev`)만으로 ISR 검증 → **production build**로 테스트
- `revalidate` 있는데 `force-dynamic` 동시 사용 → 의도 충돌, 하나만 선택

---

## 5. 완료 체크리스트

- [ ] Why / How / Trade-offs / Verify
- [ ] `revalidate = 60` 유지·설명
- [ ] production에서 60초 테스트 메모
- [ ] `yarn verify`

**다음:** [csr.md](./csr.md)
