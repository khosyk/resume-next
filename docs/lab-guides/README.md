# Lab 페이지 작성 가이드 (인덱스)

> **대상:** 직접 카피·구현을 작성하는 본인용 워크북  
> **언어:** v1 한국어 only (DECISIONS #5)  
> **코드 SSOT:** [ARCHITECTURE.md](../ARCHITECTURE.md) · [LAB_PLAN.md](../LAB_PLAN.md)

---

## 1. 학습 목표 (이 가이드 시리즈를 끝내면)

- Next.js App Router에서 **SSR / SSG / ISR / CSR**이 **언제·왜** 다른지 설명할 수 있다.
- “같은 `portfolioMetrics` 데이터”인데 **HTML 생성 시점만 다르다**는 걸 View Source·Network로 증명할 수 있다.
- 면접에서 **트레이드오프 2개**를 숫자·이 레포 구현과 연결해 말할 수 있다.

---

## 2. 권장 진행 순서

| 단계 | 문서 | 할 일 |
|------|------|--------|
| **0** | [00-prerequisites.md](./00-prerequisites.md) | `portfolio-metrics` + (CSR용) `/api/metrics` |
| **1** | [hub.md](./hub.md) | Hub 소개·비교표 카피 |
| **2** | [ssr.md](./ssr.md) | 첫 렌더링 Lab — 요청마다 HTML |
| **3** | [ssg.md](./ssg.md) | 빌드 타임 HTML |
| **4** | [isr.md](./isr.md) | 주기적 재생성 |
| **5** | [csr.md](./csr.md) | 브라우저 fetch |
| **6** | [charts.md](./charts.md) | Week 3 — Recharts |
| **7** | [3d.md](./3d.md) | Week 3 — R3F |

**팁:** 2→5는 **같은 metrics 표**를 쓰고 **타임스탬프 필드만** 다르게 보여 주면 비교 설득력이 최대입니다.

---

## 3. 모든 하위 페이지 공통 섹션 순서

`LabPageShell`의 `children` 안에 아래 순서로 넣습니다.

```txt
1. Why      — 왜 이 전략? (2~3문장, 코드 몰라도 이해)
2. Live Lab — 실제 동작·UI (metrics, 차트, 타임스탬프)
3. How      — 이 레포에서 어떻게? (3~5 bullet, 파일 경로)
4. Trade-offs — 장단 2 bullet
5. Verify   — 재현 가능한 검증 단계
```

### 작성 규칙 (`.cursor/rules/lab-content.mdc`)

- 빈 placeholder 금지 — 최소 1문장 또는 `TBD: 이유`
- How는 **일반 이론 말고 이 프로젝트 구현** 기준
- Verify는 **View Source / Network / 새로고침** 중 하나 이상

---

## 4. 공통 데이터 (숫자 SSOT)

`src/lib/data/portfolio-metrics.ts` (Week 2 생성 예정) — **홈 Stats와 동일:**

| 필드 | 값 |
|------|-----|
| crashRate | 3.89% → 0.02% |
| fps | 40 → 60 |
| qaPass | 60% → 100% |
| codeReduction | +20% |
| users | 550,000 |
| mau | 100,000 |

현재 `StatsSection`에 하드코딩된 값과 맞춰야 합니다.

---

## 5. 페이지 ↔ 파일 매핑

| URL | page 파일 |
|-----|-----------|
| `/lab` | `src/app/lab/page.tsx` |
| `/lab/ssr` | `src/app/lab/ssr/page.tsx` |
| `/lab/ssg` | `src/app/lab/ssg/page.tsx` |
| `/lab/isr` | `src/app/lab/isr/page.tsx` |
| `/lab/csr` | `src/app/lab/csr/page.tsx` |
| `/lab/charts` | `src/app/lab/charts/page.tsx` |
| `/lab/3d` | `src/app/lab/3d/page.tsx` |

공통 셸: `src/app/lab/_components/LabPageShell.tsx`  
네비 SSOT: `src/app/lab/_lib/routes.ts`

---

## 6. 완료 체크 (페이지 1개당)

- [ ] Why 2~3문장 (한국어)
- [ ] Live Lab 동작 (metrics 또는 차트)
- [ ] How 3~5 bullet (실제 파일명 포함)
- [ ] Trade-offs 2 bullet
- [ ] Verify 단계 따라 해 봤고 스크린샷/메모 남김
- [ ] `yarn verify` 통과

---

**다음:** [00-prerequisites.md](./00-prerequisites.md)부터 시작하세요.
