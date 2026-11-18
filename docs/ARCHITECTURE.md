# 아키텍처 (SSOT)

> **기준:** [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) — 라우트·colocation·`components`·`lib`  
> **의존 우선순위:** `src/` > [DECISIONS.md](./DECISIONS.md) > [TODO.md](./TODO.md) > [LAB_PLAN.md](./LAB_PLAN.md) > README

---

## 1. 한 줄 원칙

**Next.js App Router 정석** — `app/`은 라우팅, 라우트 전용 코드는 colocation, 공용은 `components/`·`lib/`.

Next.js는 폴더 레이어를 강제하지 않는다. 이 프로젝트는 공식 3전략 중 **「app 밖 공용 + 라우트별 colocation」** 을 쓴다.

---

## 2. 폴더 구조

```txt
src/
  app/                              # 라우팅 (page · layout · route)
    layout.tsx
    page.tsx                        # → /ko redirect
    globals.css
    [lang]/
      layout.tsx
      page.tsx                      # 섹션 조립만
      _components/                  # 이력서 라우트 전용 (private folder)
        HomePageClient.tsx
        HeroSection.tsx
        StatsSection.tsx
        ProjectsSection.tsx
        ProjectCard.tsx
        ...
    lab/
      layout.tsx
      page.tsx
      _components/                  # Lab 라우트 전용
        LabPageShell.tsx
        LabNav.tsx
      _lib/
        routes.ts                   # Lab nav SSOT
      ssr/ · ssg/ · isr/ · csr/ · charts/ · 3d/
    api/
      metrics/route.ts              # (Week 2)
      contact/route.ts              # (Week 4)

  components/                       # 2개 이상 라우트에서 재사용 UI
    ui/
      StatItem.tsx · ContactModal.tsx · ...

  lib/                              # 데이터·i18n·유틸 (라우트 비의존)
    data/
      links.ts
      projects/
        types.ts
        projects.tsx
      portfolio-metrics.ts          # (Week 2)
    i18n/
      dictionaries.ts
      index.ts
    motion.ts

docs/
  ARCHITECTURE.md
```

---

## 3. 새 코드 넣기 — 결정 트리

```txt
1. URL·metadata·API?                 → app/<segment>/
2. 이 라우트에서만 쓰는 UI/로직?   → app/<segment>/_components/ · _lib/
3. 여러 라우트에서 쓰는 UI?        → components/
4. 데이터·i18n·순수 유틸?          → lib/
```

### Private folder (`_folder`)

`page.tsx` / `route.ts` 없는 `_components`, `_lib`는 라우트가 되지 않는다.  
Next.js 공식 colocation 패턴.

---

## 4. Server / Client 경계

| 레이어                  | 역할          | 예시                                 |
| ----------------------- | ------------- | ------------------------------------ |
| Server Component (기본) | SSG HTML, SEO | `HeroSection`, `StatsSection`        |
| Client shell            | 전역 인터랙션 | `HomePageClient` (nav, ContactModal) |
| Client island           | 섹션 인터랙션 | `ProjectsSection` (필터·캐러셀)      |
| `dynamic(ssr: false)`   | WebGL·차트    | Lab `/lab/charts`, `/lab/3d`         |

### 메인 i18n

- URL: `/ko` · `/en` SSG
- UI 카피: `lib/i18n/dictionaries.ts`
- 링크·연락처: `lib/data/links.ts`
- 프로젝트 카드: `lib/data/projects/projects.tsx`

### Lab

- canonical URL: `/lab/*`
- nav SSOT: `app/lab/_lib/routes.ts`
- 공통 셸: `app/lab/_components/LabPageShell.tsx`

---

## 5. 데이터 SSOT

| 데이터        | 경로                             | 소비처                 |
| ------------- | -------------------------------- | ---------------------- |
| 성과 지표     | `lib/data/portfolio-metrics.ts`  | `StatsSection`, Lab    |
| UI 카피       | `lib/i18n/dictionaries.ts`       | 홈 섹션                |
| 프로필 링크   | `lib/data/links.ts`              | Hero, Footer, projects |
| 프로젝트 카드 | `lib/data/projects/projects.tsx` | `ProjectsSection`      |

---

## 6. FSD와의 관계

이전 FSD 프로젝트 습관(`features` / `domain` / `shared`)은 **채택하지 않는다.**

| FSD             | 이 프로젝트 (Next)                                  |
| --------------- | --------------------------------------------------- |
| pages           | `app/**/page.tsx`                                   |
| widgets         | `app/[lang]/_components/*`                          |
| features (액션) | Client island (`HomePageClient`, `ProjectsSection`) |
| entities        | `lib/data/*`                                        |
| shared          | `components/` + `lib/`                              |

---

**마지막 갱신:** 2026-07-10
