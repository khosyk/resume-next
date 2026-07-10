# 의사결정 로그 (Self-Feedback)

> 각 결정은 **10점 만점 중 9점 이상**일 때만 채택. 미만이면 대안을 검토해 재평가한다.

## 채택된 결정

| #   | 결정                                                                            | 점수 | 근거                                                           |
| --- | ------------------------------------------------------------------------------- | ---- | -------------------------------------------------------------- |
| 1   | 브랜치명 `feat/demo-hub-nextjs`                                                 | 9.5  | 목적( Lab Hub + Next.js )이 명확하고 기존 `main`과 분리 용이   |
| 2   | 문서 위치 `docs/`                                                               | 9.5  | README는 채용용 요약, 상세 계획·체크리스트는 docs로 분리       |
| 3   | v1 범위: 렌더링 4종 + Charts(Recharts) + 3D(R3F 1씬)                            | 9.0  | 3~4주·본업 병행 현실선. Admin/DB/ECharts 풀세트는 v2           |
| 4   | 메인 `/`는 이력서·경력기술서 역할 유지                                          | 9.5  | 채용 1차 접점은 지금 구조가 이미 검증됨                        |
| 5   | 데모 페이지 v1 언어: **한국어만**                                               | 9.0  | 메인 i18n 유지, Lab 카피는 ko 우선 → en은 v1.5                 |
| 6   | Lab Hub 템플릿 `LabPageShell` (Why / How / Trade-offs / Verify)                 | 9.5  | 면접·리뷰어가 코드 없이 의사결정을 따라갈 수 있음. 코드명 통일 |
| 7   | 공통 데이터 `lib/data/portfolio-metrics`                                        | 9.5  | SSR/SSG/ISR/CSR 비교 설득력 — StatsSection 숫자와 일치         |
| 8   | Contact: Server Action + Route Handler (v1 Week 4)                              | 9.0  | Web3Forms 키 서버화, FE 포지션에 적합한 서버 깊이              |
| 9   | 3D: R3F + `dynamic(ssr: false)` + 2D fallback                                   | 9.0  | WebGL CSR island + 접근성·저사양 대응                          |
| 10  | 차트 v1: **Recharts만** (2종)                                                   | 9.0  | RN/eCharts 경험과 연결 가능, 번들·학습 비용 최소               |
| 11  | Lab canonical URL: **`/lab/*`**                                                 | 9.0  | DECISIONS·docs·Nav 링크·`routes.ts` 일치. `app/lab/` 사용      |
| 12  | Agent Rules: **`.cursor/rules/*.mdc`**                                          | 9.5  | 9점 게이트·할루시네이션 방지·코드/Lab 컨벤션 Cursor 자동 참조  |
| 13  | 루트 i18n: **`/ko` · `/en` SSG** + Link 전환                                    | 9.5  | lang별 정적 HTML·prefetch 네비·Client islands( motion/modal )  |
| 14  | 아키텍처: **Next.js colocation** (`app` + `_components` + `components` + `lib`) | 9.0  | 공식 Project Structure 기준. FSD 레이어 미사용                 |
| 15  | 홈 섹션: **Server 기본 + Client islands** (`app/[lang]/_components`)            | 9.0  | Week 1~2 SC 분리 완료. `HomePageClient` = nav·modal shell      |
| 16  | 프로필 링크 SSOT: **`lib/data/links.ts`**                                       | 9.0  | i18n 카피와 분리. 라우트 비의존 데이터는 `lib/data/`           |
| 17  | Lab nav SSOT: **`app/lab/_lib/routes.ts`**                                      | 9.0  | private folder colocation                                      |

## 보류 (v2)

| 항목                                | 점수 | 보류 이유                                            |
| ----------------------------------- | ---- | ---------------------------------------------------- |
| Admin + Auth.js + Turso             | 7.0  | v1 목표(렌더링·시각화 어필) 대비 구현·설명 부담 과大 |
| ECharts + Chart.js 동시 비교        | 7.5  | Recharts 2개로 “시각화 역량”은 충분                  |
| `/ko` `/en` URL 라우트              | 7.5  | **v1 채택으로 승격** (#13) — 메인 Client toggle 대체 |
| GitHub webhook on-demand revalidate | 7.0  | ISR 60s 데모로 개념 증명 가능                        |

## 사용자 결정 필요 (애매)

아래는 self-feedback 후 **9점 미만** 또는 **선호에 따라 갈림**. 진행 전 확인 권장.

| #   | 질문                         | 옵션 A                                        | 옵션 B                               | 비고                                                  |
| --- | ---------------------------- | --------------------------------------------- | ------------------------------------ | ----------------------------------------------------- |
| U1  | Week 1에서 `/` SSR 분리 시점 | A) v1 Week 1은 Client 통째 이전 후 Week 4 SSR | B) Week 1부터 Hero·Stats Server 분리 | **C) `/ko` `/en` SSG + Client islands ✅ 채택** (9.0) |
| U2  | Lab 네비 라벨                | **`Lab` ✅ 사용자 확정**                      |
| U3  | v1.5 `/projects/[slug]` SSG  | Week 4 이후 v1.5                              |
| U4  | 차트 라이브러리              | **Recharts ✅** (ECharts v2 보류)             |

---

**마지막 갱신:** 2026-07-10 · 아키텍처 SSOT: [ARCHITECTURE.md](./ARCHITECTURE.md)
