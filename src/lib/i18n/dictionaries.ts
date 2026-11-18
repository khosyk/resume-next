import { profileLinks } from "@/lib/data/links";

// Portfolio i18n dictionaries (SSG /ko /en)
export const dictionaries = {
	ko: {
		nav: {
			profile: "프로필",
			impact: "성과",
			stack: "기술",
			projects: "프로젝트",
			career: "경력",
			lab: "Lab",
			contact: "연락하기",
		},
		hero: {
			badge: "성능 최적화 전문가",
			title1: "55만 유저의",
			title2: "안정성을 설계하는 해결사.",
			desc: "복잡한 비즈니스 요구사항을 정교한 기술 스펙으로 번역하여 최적의 비용으로 구현해내는 프론트엔드 엔지니어 이희운입니다.",
			resume: "이력서",
			coverLetter: "자기소개서",
			webSummary: "Web Summary",
			lab: "Technical Lab",
			summaryTitle: "전문가 요약",
			summaryDesc:
				'"최고의 공부는 실전이다"라는 신념으로 일합니다. 이전 직장에서는 하드웨어 센서 진단 모듈 연동 프로젝트를 위해 Swift를 직접 익혀 진단 기능을 구현했고, 지금은 가입자 55만 서비스의 안정성과 성능을 맡고 있습니다.',
			summaryPoint1: "비정상 종료율 3.89% → 0.02%",
			summaryPoint2: "Figma→코드 자동화 PoC",
			summaryPoint3: "비즈니스-기술 브릿지 역할 수행",
		},
		stats: {
			stability: "서비스 안정성",
			performance: "UX 퍼포먼스",
			productivity: "개발 생산성",
			efficiency: "운영 효율성",
			stabilityDesc: "Crashlytics 병행 도입, 메모리 누수·생명주기 오류 수정",
			performanceDesc: "차트 Skia 렌더러 전환·7일 단위 지연 로딩",
			productivityDesc: "함수형 전환·커스텀 훅·공통 컴포넌트 정비",
			efficiencyDesc: "어드민 RBAC 구축·레거시 결함 수정",
		},
		tech: {
			title: "핵심 기술 스택",
			desc: "React·React Native·TypeScript부터 네이티브·Firebase, AI 생산성 도구까지 리포트에 정리한 스택을 중심으로 서비스를 설계합니다.",
			cat1: "프론트엔드 & 상태관리",
			cat2: "네이티브 & 인프라",
			cat3: "AI & 생산성",
			cat4: "특화 기술",
			labTitle: "Engineering Lab",
			labDesc: "Next.js SSR · Recharts · 3D — Lab에서 렌더링 전략·시각화",
			labLink: "Lab 보기 →",
		},
		projects: {
			title: "주요 프로젝트",
			desc: "실제 비즈니스 가치를 창출한 핵심 프로젝트 경험입니다.",
			achievements: "핵심 성과",
			problem: "문제",
			thinking: "사고",
			result: "결과",
			swipeHint: "스크롤",
			cats: ["전체", "앱", "웹", "네이티브/PWA", "확장"],
		},
		mindset: {
			title: "Work Ethic",
			m1Title: "사용자 중심의 사고",
			m1Desc:
				"단순한 기능 구현을 넘어, 실제 사용자가 겪는 불편함을 데이터와 피드백으로 분석하여 최적의 UX를 설계합니다.",
			m2Title: "지속 가능한 코드",
			m2Desc:
				"팀원 누구나 이해할 수 있는 클린 코드를 지향하며, 유지보수가 용이하고 확장성 있는 아키텍처를 고민합니다.",
			m3Title: "능동적인 문제 해결",
			m3Desc:
				"기술적 한계에 부딪혔을 때 포기하지 않고, 다양한 대안을 제시하며 비즈니스 목표 달성을 위한 최선의 경로를 찾습니다.",
			m4Title: "철저한 서비스 안정성",
			m4Desc:
				"장애 발생 가능성을 사전에 차단하기 위해 꼼꼼한 테스트와 모니터링을 생활화하며, 안정적인 서비스 운영을 최우선으로 합니다.",
		},
		career: {
			title: "경력",
			edu: "학력 및 기타",
			connectiCompany: "커넥트아이 (Connect-i)",
			connectiRole: "앱 개발자",
			connectiPeriod: "2024.05 ~ 현재",
			connecti:
				"가입자 55만·MAU 10만 '열달후에' 국내·글로벌 앱의 푸시·딥링크·버전 관리·배포·에러 대응·신규 기능 담당",
			biskitCompany: "비스키트 (Biskit)",
			biskitRole: "앱/웹 개발 주임연구원",
			biskitPeriod: "2022.04 ~ 2023.10",
			biskit:
				"페스룸 케어 앱·어드민, 핀다이렉트 검사 프레임워크(Swift) 등 6개 프로젝트 — 차트 기반 데이터 시각화 어드민·앱 개발",
			univCompany: "수원대학교",
			univ: "글로벌 비즈니스학과 졸업",
			univPeriod: "2010.03 ~ 2018.03",
			exchange:
				"대만 명전대학교(Ming Chuan University) 교환학생 2학기(2016.06~2017.06) — 글로벌 비즈니스 교과목을 영어로 이수",
			globalTitle: "글로벌 역량",
			globalDesc:
				"TOEIC 905점, 호주 워킹홀리데이 1년(2014.09~2015.08). 글로벌 버전 앱의 다국어 요구사항을 개발 스펙에 반영하고, 코엑스 박람회 부스에서 해외 유저·바이어 대상 서비스 시연을 맡았습니다.",
			extraTitle: "성실성 및 책임감",
			extraDesc:
				"30사단 훈련소 훈련 성적 전체 2등(500명 중) 수료, 사단장 표창. 맡은 환경에서 성과를 내는 책임감을 증명했습니다.",
		},
		footer: {
			built: "이희운이 디자인하고 구축함 © 2026",
		},
		contactModal: {
			title: "연락하기",
			nameLabel: "이름",
			emailLabel: "이메일",
			messageLabel: "내용",
			submit: "보내기",
			sending: "전송 중…",
			sent: "메시지가 전송되었습니다. 확인 후 답장 드리겠습니다.",
			sendError: `전송에 실패했습니다. 잠시 후 다시 시도하거나 ${profileLinks.email} 으로 직접 메일 주세요.`,
			close: "닫기",
			validation: "이름·이메일·내용을 모두 입력하고, 이메일 형식을 확인해 주세요.",
		},
	},
	en: {
		nav: {
			profile: "Profile",
			impact: "Impact",
			stack: "Stack",
			projects: "Projects",
			career: "Career",
			lab: "Lab",
			contact: "Contact",
		},
		hero: {
			badge: "PERFORMANCE OPTIMIZATION EXPERT",
			title1: "Architecting Stability",
			title2: "for 550K Users.",
			desc: "I am Heeun Lee, a frontend engineer who translates complex business requirements into sophisticated technical specifications, delivering optimal value.",
			webSummary: "Web Summary",
			resume: "Resume",
			coverLetter: "Cover Letter",
			lab: "Technical Lab",
			summaryTitle: "Professional Summary",
			summaryDesc:
				"I work by the belief that the best way to learn is by doing. At my previous company I picked up Swift to build hardware diagnostics for a sensor-module project; now I own stability and performance for a service with 550K users.",
			summaryPoint1: "Crash rate 3.89% → 0.02%",
			summaryPoint2: "Figma-to-code automation PoC",
			summaryPoint3: "Business-Tech Bridge Role",
		},
		stats: {
			stability: "Service Stability",
			performance: "UX Performance",
			productivity: "Development Productivity",
			efficiency: "Operational Efficiency",
			stabilityDesc:
				"Crashlytics added alongside Sentry; memory-leak and lifecycle fixes",
			performanceDesc: "Skia chart renderer and 7-day lazy loading",
			productivityDesc: "Hooks migration, custom hooks, shared components",
			efficiencyDesc: "Admin RBAC and legacy defect fixes",
		},
		tech: {
			title: "Core Tech Stacks",
			desc: "From frontend core to native integration, infra, and AI tools, I hold a stack that transcends platform boundaries.",
			cat1: "Frontend & State",
			cat2: "Native & Infra",
			cat3: "AI & Productivity",
			cat4: "Specialized Skills",
			labTitle: "Engineering Lab",
			labDesc: "Next.js SSR · Recharts · 3D — rendering & visualization in Lab",
			labLink: "View Lab →",
		},
		projects: {
			title: "Featured Projects",
			desc: "Key project experiences that created real business value.",
			achievements: "Key Achievements",
			problem: "Problem",
			thinking: "Thinking",
			result: "Result",
			swipeHint: "SCROLL",
			cats: ["All", "App", "Web", "Native/PWA", "Extension"],
		},
		mindset: {
			title: "Work Ethic",
			m1Title: "User-Centric Thinking",
			m1Desc:
				"Beyond simple implementation, I analyze user pain points with data and feedback to design the optimal UX.",
			m2Title: "Sustainable Code",
			m2Desc:
				"I aim for clean code that any team member can understand, focusing on maintainable and scalable architecture.",
			m3Title: "Proactive Problem Solving",
			m3Desc:
				"I don't give up when facing technical limits; I propose various alternatives to find the best path for business goals.",
			m4Title: "Uncompromising Stability",
			m4Desc:
				"I prioritize stable service operation by making thorough testing and monitoring a habit to prevent potential failures.",
		},
		career: {
			title: "Career",
			edu: "Education & More",
			connectiCompany: "Connect-i",
			connectiRole: "App Developer",
			connectiPeriod: "May 2024 – Present",
			connecti:
				"Yeoldal domestic and global apps (550K signups, 100K MAU): push, deep links, versioning, releases, error response, and new features",
			biskitCompany: "Biskit",
			biskitRole: "App/Web Developer (Associate Research Engineer)",
			biskitPeriod: "Apr 2022 – Oct 2023",
			biskit:
				"Six projects, including the Pethroom Care app and admin and the Findirect inspection framework (Swift); chart-heavy admin and app work",
			univCompany: "Suwon University",
			univ: "B.A. in Global Business",
			univPeriod: "Mar 2010 – Mar 2018",
			exchange:
				"Exchange student at Ming Chuan University, Taiwan, for two semesters (Jun 2016 – Jun 2017); global business courses taught in English",
			globalTitle: "Global competence",
			globalDesc:
				"TOEIC 905; one-year working holiday in Australia (Sep 2014 – Aug 2015). I turn global-app localization requirements into dev specs, and demoed the service to overseas users and buyers at a COEX expo booth.",
			extraTitle: "Diligence & responsibility",
			extraDesc:
				"2nd of 500 at 30th Division training; division commander's commendation.",
		},
		footer: {
			built: "Designed & Built by Heeun Lee © 2026",
		},
		contactModal: {
			title: "Contact",
			nameLabel: "Name",
			emailLabel: "Email",
			messageLabel: "Message",
			submit: "Send",
			sending: "Sending…",
			sent: "Your message was sent. I will get back to you soon.",
			sendError: `Could not send. Please try again later or email ${profileLinks.email} directly.`,
			close: "Close",
			validation: "Please fill in all fields and use a valid email address.",
		},
	},
} as const;
