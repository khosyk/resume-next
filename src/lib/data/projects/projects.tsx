import type { ResumeProject } from "./types";
import { profileLinks } from "@/lib/data/links";

/** 포트폴리오에 노출할 프로젝트 카드 데이터 (언어별 카피) */
export function buildPortfolioProjects(lang: "ko" | "en"): ResumeProject[] {
	return [
		{
			id: "yeoldal",
			title:
				lang === "ko" ? "열달후에 (Global & Domestic)" : "Yeoldal (Global & Domestic)",
			category: "App",
			subtitle:
				lang === "ko"
					? "임신·출산·육아 통합 관리 앱 (누적 가입자 55만)"
					: "Pregnancy & parenting app (~550K cumulative users)",
			// 이력서(Notion) 기술 스택 요약과 동일 계열
			tags: [
				"React Native",
				"MobX",
				"REST API",
				"Firebase",
				"WebView",
				"Reanimated",
				"eCharts",
				"Android 15",
			],
			link: "https://apps.apple.com/kr/app/%EC%97%B4%EB%8B%AC%ED%9B%84%EC%97%90-%EC%9E%84%EC%8B%A0-%EC%B6%9C%EC%82%B0-%EC%9C%A1%EC%95%84-%ED%95%84%EC%88%98-%EC%95%B1/id1491862784",
			images: [
				"https://picsum.photos/seed/yeoldal1/800/1200",
				"https://picsum.photos/seed/yeoldal2/800/1200",
			],
			achievements:
				lang === "ko"
					? [
							{
								problem:
									"비정상 종료율 3.89%·스크롤/차트 병목·클래스형 레거시로 유지보수·체감 성능 한계.",
								thinking:
									"Crashlytics 기반 원인 분석, 클래스형 전면 함수형(Hooks) 전환, Atomic Design에 맞춘 구조 정리 및 스니펫·공유 컴포넌트로 중복 제거.",
								result:
									"비정상 종료율 0.02% 수준으로 안정화, 스크린 40fps→60fps·상용 품질에 가까운 체감 성능 확보.",
							},
							{
								problem:
									"헤더 Glitch·API 중복 호출·eCharts 스크롤 지연 등 인터랙션·데이터 표현 이슈.",
								thinking:
									"Reanimated 기반 헤더 교체, 디바운스로 중복 요청·화면 이동 방어, ScrollView 기반 커스텀 차트로 스크롤 성능 확보.",
								result: "끊김 없는 스크롤·차트 사용성 개선, 복잡 화면에서도 일관된 UX.",
							},
							{
								problem: "Android 15 및 16KB 페이지 사이즈 등 최신 OS·인프라 이슈.",
								thinking:
									"OS 메모리 정책·네이티브 연동 지점을 점검하고 호환 빌드·라이브러리 정합성을 맞춤.",
								result:
									"최신 안드로이드 환경에서도 서비스 연속성·크래시 없는 실행 경로 유지.",
							},
						]
					: [
							{
								problem:
									"3.89% crash rate, scroll/chart bottlenecks, and class-based legacy limiting maintainability.",
								thinking:
									"Crashlytics-led triage, full migration to function components (Hooks), structure aligned with Atomic Design, shared snippets/components to cut duplication.",
								result:
									"Crash rate toward ~0.02%, screen performance from ~40fps to ~60fps and production-grade stability.",
							},
							{
								problem:
									"Header glitch, duplicate API calls, and eCharts scroll lag hurting interactions.",
								thinking:
									"Reanimated-based header, debouncing for duplicate calls/navigation, custom ScrollView-based charts for smoother scrolling.",
								result: "Smoother scrolling and chart UX on complex screens.",
							},
							{
								problem: "Android 15 and 16KB page-size compatibility risks.",
								thinking:
									"Reviewed OS memory rules and native-linked paths; aligned builds and dependency compatibility.",
								result:
									"Stable execution on current Android targets without service disruption.",
							},
						],
			color: "bg-blue-50/50",
		},
		{
			id: "pethroom-app",
			title: lang === "ko" ? "페스룸 케어 App" : "Pethroom Care App",
			category: "App",
			subtitle:
				lang === "ko"
					? "강아지·고양이 IoT 화장실 관리 앱"
					: "IoT litter box care app for dogs and cats",
			tags: [
				"React Native",
				"Redux Toolkit",
				"JWT",
				"Axios",
				"Firebase",
				"Lottie",
				"styled-components",
			],
			link: "https://play.google.com/store/apps/details?id=com.pethroom",
			images: [
				"https://picsum.photos/seed/pethroom1/800/1200",
				"https://picsum.photos/seed/pethroom2/800/1200",
			],
			achievements:
				lang === "ko"
					? [
							{
								problem:
									"이메일·SNS(카카오, 구글, 애플) 로그인이 흩어져 있고, JWT 세션·토큰 만료·중복 로그인을 일관되게 다루기 어려움.",
								thinking:
									"단일 진입점(Single Entry Point) 함수로 인증을 추상화하고, JWT 자동 로그인/로그아웃 프로세스를 설계하며, Axios Response Interceptor로 중복 로그인 방어·토큰 만료 예외를 전역에서 제어.",
								result: "보안성 및 안정성 확보.",
							},
							{
								problem: "렌더링·메모리 부담과 대량 데이터 FlatList 지연.",
								thinking:
									"불필요한 전역 상태 참조를 줄이고 Props Drilling을 최소화하며 memo·useCallback을 배치하고 FlatList를 최적화.",
								result: "메모리 사용량 약 15% 절감, 탭 이동·네비게이션 전환 속도 향상.",
							},
							{
								problem: "딥링크·푸시·스토어 런칭·OS별 규격 대응이 필요함.",
								thinking:
									"Firebase Dynamic Links로 앱 내 초대를 구현하고 Foreground/Background/Terminated별 푸시 이벤트를 다루며, AOS/iOS 스토어·애플 개발자 포털·플레이 콘솔·Lottie 스플래시·TestFlight 베타를 수행.",
								result: "App/Play Store 런칭 및 운영 전 과정 리드.",
							},
						]
					: [
							{
								problem:
									"Fragmented email/SNS (Kakao, Google, Apple) login and inconsistent JWT/session and duplicate-login handling.",
								thinking:
									"Single entry-point auth abstraction, JWT auto login/logout, Axios response interceptors for duplicate-login defense and token expiry globally.",
								result: "Improved security and stability.",
							},
							{
								problem:
									"Rendering/memory pressure and FlatList lag on large datasets.",
								thinking:
									"Reduced unnecessary global state, minimized prop drilling, applied memo/useCallback where needed, tuned FlatList.",
								result: "~15% memory reduction and faster tab/navigation transitions.",
							},
							{
								problem: "Deeplinks, push, store launch, and per-OS policy work.",
								thinking:
									"Firebase Dynamic Links for invites; push handling by app state; AOS/iOS stores, Apple portal, Play Console, Lottie splash, TestFlight beta.",
								result: "Led App/Play Store launch and operations end-to-end.",
							},
						],
			color: "bg-orange-50/50",
		},
		{
			id: "pethroom-admin",
			title: lang === "ko" ? "페스룸 케어 Admin" : "Pethroom Care Admin",
			category: "Web",
			subtitle:
				lang === "ko"
					? "반려동물 IoT 화장실 관리 앱 어드민"
					: "Admin for the IoT litter-box care app",
			tags: [
				"React",
				"Redux Toolkit",
				"MUI",
				"MUI DataGrid",
				"Chart.js",
				"AWS S3",
				"Axios",
				"RBAC",
			],
			images: [
				"https://picsum.photos/seed/admin1/1200/800",
				"https://picsum.photos/seed/admin2/1200/800",
				"https://picsum.photos/seed/admin3/1200/800",
			],
			achievements:
				lang === "ko"
					? [
							{
								problem:
									"대시보드·대용량 테이블·지표 시각화·엑셀 입출력이 함께 필요함.",
								thinking:
									"MUI DataGrid를 커스터마이징해 다중 조건 검색·캘린더 연동 필터를 두고, Chart.js로 지표를 그래프화하며 Excel Bulk Upload/Download를 커스텀 구현.",
								result: "데이터 관리 효율화.",
							},
							{
								problem: "메뉴·페이지 접근 제어와 API·세션 보안이 필요함.",
								thinking:
									"Role-based Access Control(RBAC)로 권한별 메뉴·페이지를 통제하고, Axios Interceptor로 인증 토큰·세션을 관리하며 AWS S3로 정적 호스팅·배포를 운영.",
								result: "보안·접근 제어 및 클라우드 배포 환경 운영.",
							},
							{
								problem: "레거시 코드에 미결 에러가 남아 QA 통과가 어려움.",
								thinking:
									"미결함 에러를 전수 조사해 수정하고, 인수인계를 고려한 컴포넌트 구조 재설계를 지향.",
								result: "QA 테스트 성공률을 서비스 배포 가능 수준으로 회복.",
							},
						]
					: [
							{
								problem:
									"Dashboards, large tables, charting, and Excel bulk I/O together.",
								thinking:
									"Custom MUI DataGrid with multi-criteria search and calendar filters; Chart.js for KPI charts; custom Excel bulk upload/download.",
								result: "More efficient data management.",
							},
							{
								problem: "Menu/page access control and API/session security.",
								thinking:
									"RBAC for role-based menus/pages; Axios interceptors for tokens/sessions; AWS S3 for static hosting and deploys.",
								result: "Security, access control, and cloud deploy operations.",
							},
							{
								problem: "Legacy defects blocking QA sign-off.",
								thinking:
									"Full pass on open defects; component rework with handover-friendly structure.",
								result: "QA success rate restored to a shippable level.",
							},
						],
			color: "bg-amber-50/50",
		},
		{
			id: "findirect",
			title: lang === "ko" ? "핀다이렉트 중고폰 검사" : "Findirect device inspection",
			category: "Native/PWA",
			subtitle:
				lang === "ko"
					? "iOS 네이티브 진단 + PWA 외관검사 (하이브리드)"
					: "Native iOS diagnostics + PWA exterior inspection (hybrid)",
			// 핀다이렉트(Swift) + PWA 외관검사(React) 이력 스택 반영
			tags: [
				"Swift",
				"React",
				"PWA",
				"Blob API",
				"MediaDevices",
				"REST API",
				"Lottie",
				"Storyboard",
			],
			images: [
				"https://picsum.photos/seed/findirect1/800/1200",
				"https://picsum.photos/seed/findirect2/1200/800",
			],
			achievements:
				lang === "ko"
					? [
							{
								problem: "중고폰 하드웨어·시세 검사를 앱 안에서 일관되게 수행해야 함.",
								thinking:
									"Swift로 카메라·센서·FaceID/TouchID 등 진단 모듈 구현, Storyboard·Auto Layout·Delegate 패턴으로 기종 대응, SSL·Network Reachability로 통신 안정화.",
								result:
									"실서비스에 투입 가능한 진단 플로우와 단기간 Swift 적용 경험 축적.",
							},
							{
								problem:
									"PWA에서 외관 검사 영상 촬영·업로드가 필요하고 브라우저 제약이 큼.",
								thinking:
									"Blob·Multipart 전송, MediaDevices로 카메라·스트림 제어, 반응형 검사 UI로 기종별 화면 대응.",
								result: "웹만으로도 검사 목업·앱과 연동 가능한 촬영·전송 경로 확보.",
							},
						]
					: [
							{
								problem: "Need reliable in-app hardware and pricing inspection flows.",
								thinking:
									"Swift modules for camera, sensors, Face ID/Touch ID; Storyboard, Auto Layout, Delegates; SSL and reachability hardening.",
								result: "Shippable inspection flows and rapid Swift onboarding.",
							},
							{
								problem: "PWA exterior video capture/upload with tight browser limits.",
								thinking:
									"Blob/multipart uploads, MediaDevices for camera/streams, responsive inspection UI.",
								result:
									"Web-side capture/upload path aligned with app-side inspection.",
							},
						],
			color: "bg-purple-50/50",
		},
		{
			id: "wnms",
			title: lang === "ko" ? "JEJU-WNMS" : "JEJU-WNMS",
			category: "Web",
			subtitle:
				lang === "ko"
					? "무선 네트워크 장비(WNMS) 관제 대시보드"
					: "Wireless network (WNMS) operations dashboard",
			tags: ["React", "Redux Toolkit", "MUI", "ECharts", "Kakao Map API", "Axios"],
			images: [
				"https://picsum.photos/seed/wnms1/1200/800",
				"https://picsum.photos/seed/wnms2/1200/800",
			],
			achievements:
				lang === "ko"
					? [
							{
								problem:
									"전국 단위 AP 장비 상태를 지도·표·그래프로 한눈에 보기 어렵고 대용량 렌더링 부담.",
								thinking:
									"Kakao Map API로 위치·상태 마커 시각화, ECharts·MUI DataGrid로 트래픽·가동률·대량 리스트 처리, Row 클릭 시 상세 연동.",
								result: "관제 효율·데이터 연속성 있는 운영 화면 구축.",
							},
							{
								problem: "API 인증·세션이 화면마다 분산될 위험.",
								thinking:
									"Axios Interceptor로 토큰 주입, sessionStorage와 결합한 세션 유지.",
								result: "일관된 인증 흐름과 운영 안정성.",
							},
						]
					: [
							{
								problem:
									"Hard to monitor nationwide AP health; heavy map/chart/grid rendering.",
								thinking:
									"Kakao Map markers, ECharts and MUI DataGrid for traffic/uptime/large lists; row click to detail views.",
								result: "Better ops efficiency and continuous data drill-down.",
							},
							{
								problem: "Risk of scattered API auth/session handling.",
								thinking:
									"Axios interceptors for tokens plus sessionStorage-backed session flow.",
								result: "Consistent authenticated requests for operators.",
							},
						],
			color: "bg-emerald-50/50",
		},
		{
			id: "web-summary",
			title: lang === "ko" ? "A · Web Summary" : "A · Web Summary",
			category: "Extension",
			subtitle:
				lang === "ko"
					? "탭 triage용 Chrome 확장 — read/skip 판정·3줄 요약 (BYOK, 운영 서버 없음)"
					: "Chrome extension for tab triage—Read/Skip verdict and 3-line summaries (BYOK, no backend)",
			tags: [
				"Chrome MV3",
				"React",
				"TypeScript",
				"Vite",
				"Gemini API",
				"Side Panel",
				"Vitest",
				"BYOK",
			],
			link: profileLinks.chromeWebStore,
			images: [
				"https://picsum.photos/seed/websummary1/1200/800",
				"https://picsum.photos/seed/websummary2/1200/800",
			],
			achievements:
				lang === "ko"
					? [
							{
								problem:
									"탭·기사가 많아 무엇부터 읽을지 모호하고, 클라우드 요약 SaaS는 키·비용·프라이버시 부담.",
								thinking:
									"MV3 사이드패널에서 semantic root + Readability로 본문 추출, Gemini structured JSON으로 read/skip·3줄 요약, BYOK로 브라우저에서 Google API 직접 호출, Web Summary 백엔드 없음.",
								result:
									"읽기 triage 도구로 CWS 출시(A · Web Summary). 본문·URL·요약은 서버에 수집·저장하지 않음(스토어·legal 기준).",
							},
							{
								problem:
									"잡음 많은 본문·긴 출력으로 토큰·지연·JSON 파싱(E10) 재시도 부담.",
								thinking:
									"articleTokenDiet·semanticRootPick로 입력 정제(최대 8k chars), fullSummary 제거·MAX_OUTPUT 384, gemini-2.5-flash-lite와 조건부 flash fallback, AbortController로 요약 중지.",
								result:
									"짧은 structured 출력 중심 파이프라인, Auto summarize(3초 dwell) 등 UX 확장.",
							},
							{
								problem: "Chrome API·Gemini HTTP·React UI는 E2E 없이 회귀 위험.",
								thinking:
									"파싱·프롬프트·token diet·semantic pick·에러 등 순수 함수 위주 Vitest(9 files·50 tests), Husky pre-push·GitHub Actions에서 yarn verify.",
								result: "핵심 요약 파이프라인 단위 테스트로 푸시 전 품질 게이트.",
							},
						]
					: [
							{
								problem:
									"Too many tabs; unclear what to read; cloud summary SaaS adds key, cost, and privacy overhead.",
								thinking:
									"MV3 side panel: semantic root + Readability extraction, Gemini structured JSON for read/skip and 3-line brief, BYOK direct browser→Google calls, no Web Summary backend.",
								result:
									"Shipped on Chrome Web Store (A · Web Summary). Page text, URLs, and summaries are not collected or stored on a server (per store/legal notes).",
							},
							{
								problem:
									"Noisy page text and long outputs caused token cost, latency, and JSON parse (E10) retries.",
								thinking:
									"articleTokenDiet and semanticRootPick (8k char cap), removed fullSummary, MAX_OUTPUT 384, gemini-2.5-flash-lite with conditional flash fallback, AbortController to stop in-flight summaries.",
								result:
									"Lean structured pipeline; added Auto summarize (3s dwell) and side-panel UX.",
							},
							{
								problem:
									"Chrome APIs, live Gemini HTTP, and React UI lack automated E2E coverage.",
								thinking:
									"Vitest on pure modules—parsing, prompts, token diet, semantic pick, errors (9 files, 50 tests); Husky pre-push and GitHub Actions run yarn verify.",
								result: "Core summarization path gated by unit tests before push.",
							},
						],
			color: "bg-sky-50/50",
		},
	];
}
