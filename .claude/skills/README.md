# resume-next 프로젝트 스킬

이 폴더의 스킬은 **이 저장소에서 Claude Code를 열었을 때만** 로드된다(프로젝트 스코프).
전역(`~/.claude/skills`)에는 설치하지 않았다.

조사 내용과 필요도 평가는 [`docs/resume-optimization-research.md`](../../docs/resume-optimization-research.md)에 있다.

## 설치 목록

| 스킬 | 출처 | 하는 일 |
|------|------|---------|
| `resume-fact-check` | **로컬 작성** | 다른 스킬 위에 얹는 우선 규칙. 근거 없는 숫자·용어 차단, 한국 이력서 관례 |
| `tech-resume-optimizer` | ResumeSkills | 개발자 이력서 구조·기술 스택 섹션·프로젝트 섹션 |
| `resume-bullet-writer` | ResumeSkills | 약한 bullet → XYZ·STAR·CAR 공식으로 성과 문장 |
| `resume-quantifier` | ResumeSkills | 숫자 넣을 자리 찾기 (⚠️ 추정 권장 부분은 `resume-fact-check`가 막음) |
| `resume-ats-optimizer` | ResumeSkills | ATS 파싱·키워드 매칭 점검 |
| `job-description-analyzer` | ResumeSkills | 채용 공고 분석, 매칭 점수, 갭 분석 |
| `resume-tailor` | ResumeSkills | 공고별 맞춤 (가벼운 버전) |
| `resume-tailoring` | varunr89/resume-tailoring-skill | 공고별 맞춤 (무거운 버전: 회사 조사 → 템플릿 → 경험 발굴 인터뷰 → 매칭 점수 → MD/DOCX/PDF) |
| `portfolio-case-study-writer` | ResumeSkills | bullet → 포트폴리오 케이스 스터디 (문제·과정·해결·결과·배운 점) |
| `interview-prep-generator` | ResumeSkills | 이력서 → STAR 스토리, 예상 질문 |
| `linkedin-profile-optimizer` | ResumeSkills | LinkedIn 헤드라인·About·경력 |
| `cover-letter-generator` | ResumeSkills | 커버레터 (영문 지원용) |

## 출처와 라이선스

외부 스킬은 원본 내용을 그대로 복사했고, 각 폴더에 원본 `LICENSE`를 함께 두었다.
유일한 변경: `resume-tailoring/SKILL.md`·`branching-questions.md`의 줄바꿈을 CRLF → LF로 바꿨다
(frontmatter `name` 파싱 안정성). 원본을 Prettier가 바꾸지 않도록 `.prettierignore`에 `.claude`를 추가했다.

| 저장소 | 커밋 | 라이선스 | 확인일 |
|--------|------|----------|--------|
| [Paramchoudhary/ResumeSkills](https://github.com/Paramchoudhary/ResumeSkills) | `74ae19e7c62b0516d1c298328e5544976c12da5d` | MIT | 2026-11-13 |
| [varunr89/resume-tailoring-skill](https://github.com/varunr89/resume-tailoring-skill) | `9a4a0f20f5983d1b533627b8c5191acd1ca0cd89` | MIT | 2026-11-13 |

설치 전 확인한 것: 실행 스크립트 없음(모두 Markdown), 외부 URL 호출·프롬프트 인젝션 패턴 없음, 본문 전체 읽음.

### 원본에서 뺀 것

- `resume-tailoring/multi-job-workflow.md` — 여러 공고 일괄 처리 모드(38KB). 단일 공고 흐름만 쓴다.
  SKILL.md에 이 파일 언급이 남아 있지만 없으면 단일 공고 흐름으로 진행된다.
- ResumeSkills의 나머지 12개(설치 안 함): `academic-cv-builder`, `application-form-filler`,
  `career-changer-translator`, `cold-email-writer`, `creative-portfolio-resume`,
  `executive-resume-writer`, `offer-comparison-analyzer`, `reference-list-builder`,
  `resume-formatter`, `resume-section-builder`, `resume-version-manager`, `salary-negotiation-prep`.
  필요해지면 같은 커밋에서 가져온다.

### 검토했지만 가져오지 않은 것

- ComposioHQ/awesome-claude-skills `tailored-resume-generator` — 라이선스 표기 없음(재배포 불가로 판단).
- borghei/Claude-Skills `resume-tailor` — 라이선스 NOASSERTION.
- jezweb/claude-skills `resume-cover-letter` — 스킬 감사 사이트에서 MEDIUM 위험 등급.

## 업데이트 방법

```bash
git clone --depth 1 https://github.com/Paramchoudhary/ResumeSkills.git /tmp/rs
diff -r /tmp/rs/skills/resume-bullet-writer .claude/skills/resume-bullet-writer
```

변경 내용을 읽은 뒤에만 덮어쓰고, 위 표의 커밋을 갱신한다.
