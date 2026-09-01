# Donggi Yoon Visual Archive

윤동기 / Donggi Yoon의 한국어 중심 개인 비주얼 아카이브입니다.

여행과 일상, 사람과 공간의 분위기를 사진과 짧은 영화로 기록하고, 촬영과 편집 과정에서 발견한 생각을 작업과 저널로 축적합니다. 영문 디스플레이 타이포그래피는 영화적인 분위기를 만들고, 실제 설명과 이야기는 한국어가 이끕니다.

브랜드 문장: **BETWEEN FRAMES.**

## 방향

- 한국어 우선의 작업 설명과 읽기 경험
- 실제 사진과 영상이 중심이 되는 시네마틱 에디토리얼 구성
- 완성작뿐 아니라 목적, 콘셉트, 과정, 회고를 함께 남기는 진행형 포트폴리오
- Safari, 모바일, 모션 감소와 저데이터 환경을 고려한 미디어 경험
- 정적 export와 Cloudflare 배포

디자인과 콘텐츠 원칙은 [`DESIGN.md`](./DESIGN.md)를 기준으로 합니다.

## 기술 구성

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- `next/image`
- Static export (`output: "export"`)
- Cloudflare Pages / Workers static assets

## 로컬 실행

```bash
npm install
cp .env.example .env.local
npm run dev
```

기본 로컬 주소는 `http://localhost:3000`입니다.

검증과 정적 빌드:

```bash
npm run lint
npm run build
```

정적 결과물은 `out/`에 생성됩니다.

## 주요 경로

- `/` - 시네마틱 홈 아카이브
- `/about` - 윤동기 소개와 작업 관점
- `/works` - 영상과 사진 작업
- `/works/[slug]` - 작업별 에디토리얼 케이스 스터디
- `/journal` - 촬영과 편집에 관한 한국어 필드 노트
- `/journal/[slug]` - 저널 본문
- `/contact` - 이메일과 소셜 링크
- `/rss.xml`
- `/sitemap.xml`
- `/robots.txt`

## 콘텐츠 구조

```text
src/data/
  films.ts      홈의 짧은 필름
  stills.ts     홈의 사진 시퀀스
  home.ts       홈 섹션 문구
  works.ts      작업 목록과 상세 내용
  journal.ts    저널 글
  profile.ts    이름, 소개, 연락처
  skills.ts     About의 작업 영역
  timeline.ts   About의 현재 학습과 기록
```

홈 UI는 `src/components/home/`에 섹션별로 나뉘어 있습니다. `CinematicOnePage.tsx`는 히어로 영상, 필름 대화상자, reveal과 패럴랙스의 공유 상태를 관리하고 각 섹션을 조합합니다.

## 작업 추가

`src/data/works.ts`의 `works` 배열에 새 항목을 추가합니다.

필수 내용:

- 제목과 slug
- 연도, 분야, 위치
- 한국어 설명
- 목적, 콘셉트, 과정, 어려웠던 점, 회고
- 역할과 도구
- 대표 이미지와 한국어 alt
- 상세 이미지

영상이 있는 작업은 `video`에 MP4 경로, poster, 재생 시간을 추가합니다. `generateStaticParams()`가 데이터에서 경로를 만들기 때문에 별도의 페이지 파일은 필요하지 않습니다.

## 홈 필름 추가

1. MP4와 poster를 `public/media/films/`에 추가합니다.
2. `src/data/films.ts`의 `films` 배열에 항목을 추가합니다.
3. 제목, 한국어 설명, 역할, 연도, 길이, 화면비, 한국어 alt를 작성합니다.

전체 필름은 사용자가 재생하기 전 미리 로드하지 않습니다. 히어로 미디어를 바꿀 때는 모바일 파일, MP4 폴백, poster, Save-Data와 reduced-motion 동작을 함께 확인해야 합니다.

## 홈 스틸 추가

1. 사진을 `public/media/stills/`에 추가합니다.
2. `src/data/stills.ts`에 경로, 한국어 alt, 캡션, 배치, 패럴랙스 속도를 추가합니다.
3. 필요할 때만 도시, 국가, 연도, 매체, 카메라 정보를 기록합니다.

사진 아카이브는 균일한 썸네일 그리드가 아니라 전시형 시퀀스입니다. 사진 수를 늘리기보다 강한 장면을 선별하고 기존 배치와 호흡을 확인합니다.

## 저널 추가

`src/data/journal.ts`의 `journalPosts`에 글을 추가합니다.

- 제목과 slug
- ISO 날짜 (`YYYY-MM-DD`)
- 카테고리와 태그
- 한국어 요약
- 대표 이미지와 한국어 alt
- 한국어 문단 배열

새 글은 저널 목록, 상세 정적 경로, 홈 미리보기, RSS와 sitemap에 자동 반영됩니다.

## 미디어 구조

```text
public/
  media/
    dalian/     히어로와 Dalian 필름
    films/      홈의 짧은 필름과 poster
    stills/     홈 사진 시퀀스
  images/
    archive/    작업과 저널 상세 이미지
  logo/         로고, 아이콘, 공유 이미지
```

실제 촬영한 사진과 영상만 사용합니다. 새 이미지는 레이아웃 이동이 없도록 안정적인 비율로 배치하고, 보이는 장면을 설명하는 자연스러운 한국어 alt를 작성합니다.

## 사이트 URL과 SEO

공개 주소는 환경변수 한 곳에서 관리합니다.

```bash
NEXT_PUBLIC_SITE_URL=https://www.donggi.my
```

이 값은 metadataBase, canonical, Open Graph, Twitter, RSS, sitemap, robots 주소에 사용됩니다. 값이 없거나 잘못되면 `https://www.donggi.my`를 사용합니다.

## Cloudflare 배포

Next.js는 프로덕션 빌드에서 정적 export를 사용합니다.

- Build command: `npm run build`
- Output directory: `out`
- Environment variable: `NEXT_PUBLIC_SITE_URL=https://www.donggi.my`
- Portfolio domains: `donggi.my`, `www.donggi.my`

`wrangler.jsonc`는 `donggi-portfolio` Worker가 `./out`의 정적 자산을 제공하도록 구성되어 있습니다. GitHub `main`과 연결된 Cloudflare 프로젝트에서는 `main`에 반영된 검증 완료 버전이 자동 배포됩니다.

## 도메인 제한

**`martin.donggi.my`는 Hermes Telegram webhook 전용입니다.**

이 저장소 작업에서 다음 항목을 수정하지 않습니다.

- `martin.donggi.my` DNS 레코드
- Worker route
- webhook
- custom domain 연결
- nameserver와 기타 관련 Cloudflare 설정

포트폴리오는 `donggi.my`와 `www.donggi.my`만 사용합니다.
