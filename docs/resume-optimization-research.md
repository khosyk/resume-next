# 이력서 최적화 스킬·정보 조사 (2026-11-13)

목적: resume-next(메인 이력서·포트폴리오 저장소)에서 쓸 Claude 스킬을 먼저 넣어 보고,
무엇이 더 필요하고 무엇이 덜 필요한지 판단할 근거를 남긴다.
설치 목록과 출처는 [`.claude/skills/README.md`](../.claude/skills/README.md)에 있다.

## 1. 스킬 생태계 현황

웹 검색으로 찾은 이력서 관련 Claude 스킬은 대부분 개인이 만든 커뮤니티 스킬이다.
Anthropic 공식 이력서 스킬은 찾지 못했다.

| 저장소 / 스킬                                                | 규모 (2026-11-13)   | 라이선스    | 판단                                                                          |
| ------------------------------------------------------------ | ------------------- | ----------- | ----------------------------------------------------------------------------- |
| Paramchoudhary/ResumeSkills (22개 스킬 묶음)                 | ★3.1k, 2026-06 갱신 | MIT         | **10개 설치**                                                                 |
| varunr89/resume-tailoring-skill                              | ★873, 2026-03 갱신  | MIT         | **설치** (진실성 원칙이 가장 엄격)                                            |
| ComposioHQ/awesome-claude-skills `tailored-resume-generator` | ★79k (목록 저장소)  | 표기 없음   | 제외 — 재배포 근거 없음. 리뷰어도 "ATS가 뭔지 설명하는 데 분량을 쓴다"고 지적 |
| borghei/Claude-Skills `resume-tailor`                        | ★1.1k               | NOASSERTION | 제외                                                                          |
| jezweb/claude-skills `resume-cover-letter`                   | —                   | —           | 제외 — 감사 사이트 MEDIUM 위험                                                |
| melodic-software `resume-optimization`                       | —                   | MIT         | 현재 저장소에서 사라짐                                                        |

공통 한계:

- **전부 미국 시장 기준이다.** LinkedIn·커버레터·ATS 중심이고, 한국의 경력기술서 관례는 없다.
- **예시 숫자가 모두 가상이다.** ("reducing API latency by 60% for 100K DAU" 같은 것)
- **추정을 권하는 스킬이 있다.** `resume-quantifier`·`resume-bullet-writer`는 정확한 수치가 없으면
  어림잡아 쓰라고 한다. 면접 꼬리질문에서 무너지는 지점이라, 로컬 스킬 `resume-fact-check`로 막았다.
- **출처 없는 통계를 사실처럼 쓴다.** `resume-ats-optimizer`의 "75% of resumes are rejected by ATS"는
  아래 3-4 참고.

## 2. 설치한 것과 이유

- **`resume-fact-check` (로컬 작성):** 다른 스킬보다 먼저 지켜야 할 규칙. 숫자는
  `portfolio-metrics.ts`·저장소 근거·사용자 확인값만, 전문용어는 구현 근거가 있을 때만,
  타인 LinkedIn 프로필 수집 금지, 한국 이력서 관례 적용. 이전 세션에서 "RAG·임베딩은 근거가 없어
  쓰면 안 된다"고 정리한 원칙을 스킬로 고정한 것이다.
- **ResumeSkills 10개:** 개발자 이력서 작성에 직접 관련된 것만 골랐다
  (구조, bullet, 정량화, ATS, 공고 분석, 맞춤, 케이스 스터디, 면접, LinkedIn, 커버레터).
- **resume-tailoring:** ResumeSkills의 `resume-tailor`와 역할이 겹친다. 일부러 둘 다 넣었다.
  실제 공고 하나로 비교해 보고 하나만 남긴다.

## 3. 이력서 최적화 핵심 정보

각 항목 끝에 근거의 수준을 적었다. 대부분 채용 서비스·이력서 업체 블로그라 이해관계가 있다.

### 3-1. 성과 문장 공식

- **XYZ:** "Y로 측정된 X를 Z를 해서 달성했다." 구글 전 인사 책임자 Laszlo Bock이 권한 것으로
  널리 인용된다. 구글 공식 1차 출처는 확인하지 못했다. _(여러 블로그 일치, 1차 출처 미확인)_
- 흔한 실패는 X와 Z만 쓰고 측정값 Y를 빼는 것. 모든 bullet을 공식에 억지로 맞출 필요는 없다.
- **STAR / CAR:** 면접 답변에는 STAR(상황·과제·행동·결과), 이력서 한 줄에는 CAR(문제·행동·결과)를
  압축해서 쓰는 게 일반적이다.

### 3-2. 한국 개발자 이력서 관례

- 맨 위에 "어떤 사람인지" 한 줄 요약. 제목에 자신을 설명하는 키워드를 넣는다.
  요약 문단은 다 쓴 뒤 마지막에 쓴다. _(이랜서·인프런 블로그)_
- 채용 담당자가 한 장을 보는 시간은 15초 안팎이라는 원티드 글이 있다. 핵심을 위에 둔다. _(원티드)_
- 경력기술서에서 서류 탈락이 나는 흔한 원인 세 가지: 이력서 내용을 그대로 옮김, 성과가 모호함,
  프로젝트 단위로 나누지 않음. _(비즈폼)_
- AI 경험은 **문제 → 역할 → 기술 선택 이유 → 성과** 순서로 쓴다. "도구를 썼다"만 적는 것이
  대표적인 실수이고, 무엇을 판단해서 무엇을 만들었는지가 드러나야 한다. _(잡플래닛)_
- "자세한 건 링크 참고"에 기대지 말 것. 한 칼럼은 면접관이 링크를 눌러 보는 경우가 5% 미만이라고 한다.
  _(개인 경험담, 통계 아님)_
- 기술 스택 표기는 지원 공고에 맞춘다. _(인프런·원티드)_

### 3-3. AI가 쓴 이력서 티

- 채용 담당자 다수가 "AI가 쓴 이력서를 알아볼 수 있다"고 답했다는 설문이 여럿 있다
  (53~88%로 출처마다 차이가 큼). _(업체 설문, 수치 신뢰 낮음)_
- 수치보다 일관된 결론: **걸리는 건 AI 사용 자체가 아니라 상투적이고 숫자 없는 문장이다.**
  "results-driven", "proven track record", 숫자 없는 "significantly improved" 같은 표현이 대표 신호다.
- AI 탐지기는 확률적이고 완벽하지 않다. 주요 ATS(Workday·Greenhouse·Lever)는 키워드 파싱을 하고
  AI 탐지기를 돌리지 않는다는 주장과 반대 주장이 있는데, 둘 다 1차 출처로 확인하지 못했다.

### 3-4. ATS "75% 탈락" 통계

- "이력서 75%가 사람이 보기 전에 ATS에서 탈락한다"는 수치는 2012년 이력서 최적화 업체 Preptel의
  마케팅 문구에서 나왔다. 방법론이 공개된 적 없고 업체는 2013년에 문을 닫았다.
  _(여러 출처 일치)_ → 근거로 쓰지 않는다. ATS 대비는 "표준 섹션명·텍스트 PDF·공고 키워드 표기
  맞추기" 정도면 충분하다.

## 4. 필요도 가설 (써 보기 전 판단)

사용자 상황: 프론트엔드 개발자, AI 활용 프로젝트 다수, resume-next가 ko/en 웹 이력서.

| 구분                  | 스킬                                 | 이유                                                                       |
| --------------------- | ------------------------------------ | -------------------------------------------------------------------------- |
| **자주 쓸 것**        | `resume-fact-check`                  | 모든 문장 확정 전에 필요                                                   |
|                       | `resume-bullet-writer`               | projects.tsx 항목 문장 다듬기                                              |
|                       | `tech-resume-optimizer`              | 기술 스택·프로젝트 섹션 구조                                               |
|                       | `portfolio-case-study-writer`        | resume-next 프로젝트 상세 페이지와 형식이 맞음                             |
| **지원할 때**         | `job-description-analyzer`           | 공고마다 갭 확인                                                           |
|                       | `resume-tailor` ↔ `resume-tailoring` | 겹침. 비교 후 하나만 남김                                                  |
|                       | `interview-prep-generator`           | AI 관련 주장의 꼬리질문 대비에 특히 유용                                   |
|                       | `resume-ats-optimizer`               | PDF로 제출하는 곳에만. 국내 플랫폼 자체 양식 입력이면 영향 작음(확인 필요) |
| **덜 필요할 수 있음** | `resume-quantifier`                  | 추정 권장이 fact-check와 충돌. "숫자 찾는 질문 목록" 부분만 쓸모           |
|                       | `linkedin-profile-optimizer`         | LinkedIn을 실제로 쓰는지에 달림                                            |
|                       | `cover-letter-generator`             | 영문 지원용. 국내 자기소개서와 구조가 다름                                 |

### 아직 없는 것 (필요하면 직접 만들어야 함)

- **한국어 경력기술서·자기소개서 전용 스킬:** 라이선스가 명확한 공개 스킬을 찾지 못했다.
- **resume-next → PDF 이력서 출력:** 웹 페이지를 제출용 PDF로 뽑는 흐름. `anthropic-skills:pdf`나
  인쇄용 CSS로 가능하지만 아직 정해진 방법이 없다.
- **증거 수집 자동화:** 다른 저장소(wemake, local_llm, ai-web-summarizer)에서 근거를 모아
  주장-근거 표를 만드는 작업. 지금은 `resume-fact-check` 절차를 사람이 돌리는 방식이다.

## 5. 평가 방법 (다음 단계)

실제 작업 두 개로 써 보고 판단한다.

1. **문장 다듬기:** `projects.tsx`의 `web-summary` 항목을 `resume-bullet-writer`로 고친 뒤
   `resume-fact-check`로 검사한다. 볼 것: 근거 없는 주장이 몇 개 나왔나, 질문이 적절했나,
   그대로 쓸 만한 문장이 몇 개인가.
2. **공고 맞춤:** 관심 있는 실제 공고 하나로 `job-description-analyzer` → `resume-tailor`와
   `resume-tailoring`을 각각 돌려 비교한다. 볼 것: 걸린 시간, 질문의 질, 결과물 차이.

결과에 따라 안 쓰는 스킬은 지우고(`.claude/skills/<이름>` 폴더 삭제), README 표를 갱신한다.

## 출처

스킬

- [Paramchoudhary/ResumeSkills (GitHub)](https://github.com/Paramchoudhary/ResumeSkills)
- [varunr89/resume-tailoring-skill (GitHub)](https://github.com/varunr89/resume-tailoring-skill)
- [tech-resume-optimizer 소개 (claudeskills.info)](https://claudeskills.info/skills/paramchoudhary/resumeskills/tech-resume-optimizer/)
- [tailored-resume-generator 리뷰 (tessl.io)](https://tessl.io/registry/skills/github/davepoon/buildwithclaude/tailored-resume-generator/review)
- [tailored-resume-generator (skills.sh)](https://www.skills.sh/composiohq/awesome-claude-skills/tailored-resume-generator)
- [resume-cover-letter (skillselion)](https://skillselion.com/skills/jezweb/claude-skills/resume-cover-letter)
- [Claude Skills for Job Seekers (claudecodehq)](https://claudecodehq.com/blog/claude-skills-job-seekers)
- [Claude skills for job seekers (Asad Faizee)](https://blog.asadfaizee.is-a.dev/posts/claude-skills-for-job-seekers/)

작성법·관례

- [AI 경험, 신입 개발자 이력서에 어떻게 강조할까 (잡플래닛)](https://www.jobplanet.co.kr/contents/news-8460)
- [개발자 이력서 작성 가이드 (이랜서)](https://www.elancer.co.kr/blog/detail/107)
- [인프런이 준비한 개발자 이력서 작성 TIP](https://www.inflearn.com/blogs/2119)
- [원티드 개발자 이력서 아티클](https://www.wanted.co.kr/events/22_10_s01_b05)
- [자신 있는 경력, 서류에서 자꾸 떨어진다면? (비즈폼)](https://www.bizforms.co.kr/smartblock/560)
- [구직 중인 개발자에 도움 되는 이력서 작성 팁 (CIO)](https://www.cio.com/article/3531746/)
- [XYZ resume format (Teal)](https://www.tealhq.com/post/xyz-resume)
- [How to use the XYZ resume format (Simplify)](https://simplify.jobs/blog/how-to-use-the-xyz-resume-format)
- [Your resume bullets don't explain (Random Recruiter)](https://randomrecruiter.substack.com/p/your-resume-bullets-dont-explain)

AI 작성 탐지·ATS

- [Can recruiters tell if AI wrote your resume? (Simplify)](https://simplify.jobs/blog/can-recruiters-tell-if-ai-wrote-your-resume)
- [How to detect AI-generated resumes (Gem)](https://app.gem.com/blog/detect-ai-generated-resumes)
- [Signs of an AI-generated resume (Enhancv)](https://enhancv.com/blog/signs-of-ai-generated-resume/)
- [Can employers identify AI-written resumes? (College Recruiter)](https://www.collegerecruiter.com/blog/2026/03/26/can-employers-identify-ai-written-resumes-should-they-care)
- [The ATS resume rejection myth (The Interview Guys)](https://blog.theinterviewguys.com/?p=1967)
- [ATS aren't excluding applicants — people are (HiringThing)](https://blog.hiringthing.com/applicant-tracking-system-myths)
- [75% ATS rejection claim analyzed (lenz.io)](https://lenz.io/c/ats-applicant-tracking-system-75-percent-rejection-rate-bc6fd7d4)
