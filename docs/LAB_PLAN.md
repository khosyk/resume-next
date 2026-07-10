# Engineering Lab & Next.js 마이그레이션 계획

> **브랜치:** `feat/lab-content`  
> **목표:** `/`는 이력서·경력기술서, `/lab/*`는 Next.js·차트·3D **어필 중심** Lab  
> **기간:** 3~~4주 (주 10~~15h, 본업 병행)  
> **체크리스트:** [TODO.md](./TODO.md) · **의사결정:** [DECISIONS.md](./DECISIONS.md) · **아키텍처:** [ARCHITECTURE.md](./ARCHITECTURE.md)  
> **직접 작성 가이드:** [lab-guides/README.md](./lab-guides/README.md)

---

## 1. 한 줄 컨셉

**메인은 채용 담당자용 이력서, Lab은 “왜 이 스택 · 어떻게 구현 · 트레이드오프”를 증명하는 7페이지.**

면접 포지션: _“풀스택 5년”이 아니라 **RN·Web FE + Next.js 렌더링·서버 경계를 이해하고 적용하는 FE**._

---

## 2. 사이트맵

```txt
/                           → /ko redirect
/ko · /en                   이력서·경력기술서 (SSG + Client islands)
/lab                      Lab Hub (SSG) — 전략 맵 + 진입
/lab/ssr                  SSR 데모
/lab/ssg                  SSG 데모
/lab/isr                  ISR 데모 (revalidate)
/lab/csr                  CSR 데모
/lab/charts               차트 (Recharts, Client)
/lab/3d                   3D (R3F, Client / WebGL)

/api/metrics                GET — CSR 데모용 (의도적 delay)
/api/contact                POST — Web3Forms 프록시 (Week 4)

[v1.5]
/projects/[slug]            SSG 프로젝트 상세
```

---

## 3. 첫 페이지 (`/ko` · `/en`) — 이력서 역할 + Lab 진입

### 3.1 유지

| 항목                                | 비고                                          |
| ----------------------------------- | --------------------------------------------- |
| Hero, Stats, Tech, Projects, Career | `app/[lang]/_components/*` 섹션               |
| KR/EN                               | `/ko` · `/en` SSG + Link 전환 (DECISIONS #13) |
| Notion 이력서·자기소개서 (ko)       | `lib/data/links.ts`                           |
| ContactModal                        | Week 4 Server Action                          |
| motion 스크롤·프로젝트 캐러셀       | `HomePageClient` · `ProjectsSection` Client   |

### 3.2 Lab 진입 (3곳)

1. **Nav** — `Profile · Impact · Stack · Projects · Career · **Lab** · Contact`
2. **Hero** — 보조 CTA `Technical Lab →` (`/lab`)
3. **Tech 섹션 하단** — 카드 `Engineering Lab — SSR · Charts · 3D`

### 3.3 Server / Client 분리 (완료 + Week 4 잔여)

| Phase    | `/[lang]` 처리                                                      |
| -------- | ------------------------------------------------------------------- |
| Week 1~2 | `app/[lang]/_components` SC 분리 + `HomePageClient` Client shell ✅ |
| Week 4   | Contact 서버화, OG metadata 보강 (Hero·Stats SC 분리는 완료)        |

---

## 4. Lab Hub (`/lab`)

**렌더링:** SSG  
**역할:** 6개 데모 카드 + 렌더링 4종 비교표 + 간단 아키텍처 다이agram

### 카드 필드 (통일)

- **한 줄 설명**
- **Why** — 왜 이 전략/스택?
- **How** — 이 프로젝트에서 어떻게?
- **Verify** — View Source / Network / 새로고침 테스트
- **→ 데모 보기**

### 렌더링 비교표 (동일 `portfolioMetrics`)

|             | SSR        | SSG             | ISR              | CSR            |
| ----------- | ---------- | --------------- | ---------------- | -------------- |
| HTML 생성   | 요청마다   | 빌드            | 빌드 + 주기 갱신 | 브라우저       |
| SEO         | ◎          | ◎               | ◎                | △              |
| TTFB        | 중         | ◎               | ◎                | —              |
| 실시간성    | ◎          | ×               | ○                | ◎              |
| 이 프로젝트 | `/lab/ssr` | Hub, `/lab/ssg` | `/lab/isr`       | `/lab/csr`, 3D |

---

## 5. 공통 템플릿 `LabPageShell`

모든 `/lab/*` 하위 페이지 공통 (`app/lab/_components/LabPageShell.tsx`):

```txt
StrategyBadge
Title + Why (2~3문장)
Live Lab
How I built it (3~5 bullet)
Trade-offs (2 bullet)
ProofPanel (Verify)
LabNav (이전/다음 · Hub)
```

---

## 6. 공통 데이터

**파일:** `src/lib/data/portfolio-metrics.ts` (Week 2)

`StatsSection`과 **숫자 일치**:

| 필드          | 값                         |
| ------------- | -------------------------- |
| crashRate     | before 3.89% → after 0.02% |
| fps           | 40 → 60                    |
| qaPass        | 60% → 100%                 |
| codeReduction | +20%                       |
| users         | 550,000                    |
| mau           | 100,000                    |

렌더링 4페이지 + charts가 **같은 소스** → “데이터는 같고 전략만 다르다” 비교.

---

## 7. 페이지별 상세

### 7.1 `/lab/ssr`

|            |                                                                                   |
| ---------- | --------------------------------------------------------------------------------- |
| **Why**    | SEO·OG·첫 HTML에 의미 있는 콘텐츠                                                 |
| **How**    | Server Component: metrics 테이블 + `generatedAt`. Recharts는 `dynamic(ssr:false)` |
| **Verify** | View Source에 숫자·시간 존재                                                      |
| **어필**   | SPA vs Next SSR 경계 이해                                                         |

### 7.2 `/lab/ssg`

|            |                                |
| ---------- | ------------------------------ |
| **Why**    | 불변 콘텐츠, CDN·TTFB          |
| **How**    | 정적 페이지 + `BUILD_TIME` env |
| **Verify** | redeploy 전 `builtAt` 불변     |

### 7.3 `/lab/isr`

|            |                                                       |
| ---------- | ----------------------------------------------------- |
| **Why**    | rebuild 없이 freshness                                |
| **How**    | `export const revalidate = 60` + `regeneratedAt` 표시 |
| **Verify** | 60초 후 새로고침 → 시간 변경                          |
| **v2**     | `/api/revalidate` webhook                             |

### 7.4 `/lab/csr`

|            |                                                              |
| ---------- | ------------------------------------------------------------ |
| **Why**    | 실시간·필터·WebGL, SEO 불필요 UI                             |
| **How**    | `useEffect` → `/api/metrics` (500ms delay), skeleton → chart |
| **Verify** | View Source에 차트 데이터 없음, Network에 API                |

### 7.5 `/lab/charts`

|               |                                                           |
| ------------- | --------------------------------------------------------- |
| **Why**       | 열달후에 eCharts·Admin Chart.js → Web Recharts            |
| **How**       | Before/After Bar + Timeline Line, `dynamic import`        |
| **Trade-off** | Recharts 경량 vs ECharts 고급 — RN WebView 번들·호환 고려 |
| **v2**        | Chart.js 도넛 1개                                         |

### 7.6 `/lab/3d`

|               |                                                                |
| ------------- | -------------------------------------------------------------- |
| **Why**       | WebGL은 SSR 불가 → 렌더링 전략의 연장                          |
| **How**       | R3F + drei, Performance Ring (40→60 fps), `dynamic(ssr:false)` |
| **Fallback**  | `prefers-reduced-motion` / WebGL 실패 → 2D Recharts            |
| **Trade-off** | 번들·GPU vs 임팩트 — 씬 1개로 제한                             |

---

## 8. 서버 (Week 4)

| API                 | 역할                                               |
| ------------------- | -------------------------------------------------- |
| `POST /api/contact` | Web3Forms 프록시, `WEB3FORMS_ACCESS_KEY` 서버 전용 |
| `GET /api/metrics`  | CSR 데모 BFF, 500ms delay                          |
| `GET /api/health`   | (선택) status, buildId                             |

**Server Action:** Contact 폼 Zod 검증 + honeypot (Route Handler와 병행 또는 대체)

---

## 9. 폴더 구조

상세: [ARCHITECTURE.md](./ARCHITECTURE.md)

```txt
src/
  app/
    [lang]/
      _components/              # 이력서 섹션·ProjectCard
      page.tsx · layout.tsx
    lab/
      _components/              # LabPageShell · LabNav
      _lib/routes.ts
      ssr/ · ssg/ · isr/ · csr/ · charts/ · 3d/
    api/
  components/ui/                # StatItem · ContactModal …
  lib/
    data/links.ts · projects/ · portfolio-metrics.ts
    i18n/
    motion.ts
docs/
  ARCHITECTURE.md
```

---

## 10. 패키지 (yarn)

### Week 1~2 (Next + 기존)

```bash
yarn add next react react-dom motion lucide-react
yarn add -D @types/node typescript tailwindcss @tailwindcss/postcss postcss
```

### Week 3

```bash
yarn add recharts
yarn add three @react-three/fiber @react-three/drei
```

### Week 4

```bash
yarn add zod   # Contact 검증 (선택)
```

**제거 (마이그레이션 완료 시):** `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`, `index.html`, `src/main.tsx`

---

## 11. v1 Done Definition

- [ ] `/` — 현재와 동일하게 이력서·경력기술서로 사용 가능
- [ ] Nav / Hero / Tech에서 `/lab` 진입
- [ ] `/lab` + 렌더링 4종 — Why / How / Verify 문구
- [ ] `/lab/charts` — Recharts 2개
- [ ] `/lab/3d` — R3F 1씬 + 2D fallback
- [ ] Contact 키 클라이언트 미노출
- [ ] README + docs Architecture 요약 (`ARCHITECTURE.md` ✅, Vercel URL 대기)
- [ ] Vercel 배포 URL

---

## 12. README / 면접용 요약 (복붙)

```markdown
## Architecture

- `/ko` · `/en` — 채용용 이력서 (SSG + Client islands)
- `/lab` — SSR · SSG · ISR · CSR 비교 (동일 portfolioMetrics)
- Charts — Recharts, Client island, RN/eCharts 경험의 Web 적용
- 3D — R3F, WebGL CSR only, reduced-motion fallback
- Contact — Server-side key, no client exposure

상세: docs/ARCHITECTURE.md
```

---

## 13. v2 Backlog

- Admin + Auth.js + RBAC (Pethroom Admin 경력 축소 재현)
- ECharts / Chart.js 비교 탭
- `/projects/[slug]` SSG + dynamic OG
- GitHub webhook → `revalidateTag`
- Cron sync

---

**관련 문서:** [ARCHITECTURE.md](./ARCHITECTURE.md) · [TODO.md](./TODO.md) · [DECISIONS.md](./DECISIONS.md)
