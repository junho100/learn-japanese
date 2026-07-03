# 일본어 카타카나 퀴즈

일본어 카타카나(カタカナ)를 학습할 수 있는 인터랙티브 웹 퀴즈 애플리케이션입니다.

## 🎯 특징

- **46개의 문자** - 카타카나 46자 학습
- **인터랙티브한 UI** - 실시간 피드백과 애니메이션
- **진행도 추적** - 정확도, 완료된 문자 수, 라운드 진행 상황 표시
- **반응형 디자인** - 모바일과 데스크톱 모두 지원
- **무한 반복 학습** - 라운드별로 계속해서 연습 가능

## 🚀 시작하기

### 온라인에서 바로 사용하기

GitHub Pages를 통해 배포된 애플리케이션을 바로 사용할 수 있습니다:

```
https://[YOUR-USERNAME].github.io/learn-japanese/
```

### 로컬에서 실행하기

1. 저장소를 클론합니다:

```bash
git clone https://github.com/[YOUR-USERNAME]/learn-japanese.git
cd learn-japanese
```

2. `index.html` 파일을 브라우저에서 엽니다:

```bash
open index.html
# 또는
python -m http.server 8000
# 그 후 http://localhost:8000 접속
```

## 📖 사용 방법

1. 화면에 표시된 일본어 문자를 확인합니다
2. 해당 문자의 한글 발음을 입력란에 입력합니다
3. Enter 키를 눌러 제출합니다
4. 정답이면 다음 문제로, 오답이면 나중에 다시 출제됩니다
5. 모든 문자를 완료하면 다음 라운드가 시작됩니다

### 입력 예시

- `ア` → `아`
- `シ` → `시` 또는 `쉬`
- `フ` → `후` 또는 `푸`

## 🛠️ 기술 스택

- **HTML5** - 구조
- **CSS3** - 스타일링 및 애니메이션
- **Vanilla JavaScript** - 로직 및 인터랙션
- **GitHub Pages** - 호스팅
- **GitHub Actions** - 자동 배포

## 📦 프로젝트 구조

```
learn-japanese/
├── index.html          # 메인 HTML 파일
├── styles.css          # 스타일시트
├── app.js              # 애플리케이션 로직
├── sample.js           # 원본 React 컴포넌트 (참고용)
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Pages 배포 워크플로우
└── README.md           # 문서
```

## 🚀 배포하기

이 프로젝트는 GitHub Actions를 통해 자동으로 배포됩니다.

### 배포 설정

1. GitHub 저장소 생성 후 코드를 푸시합니다
2. GitHub 저장소 Settings > Pages로 이동합니다
3. Source를 "GitHub Actions"로 설정합니다
4. `master` 또는 `main` 브랜치에 푸시하면 자동으로 배포됩니다

### 배포 워크플로우

`master` 또는 `main` 브랜치에 푸시하면:

1. GitHub Actions가 자동으로 실행됩니다
2. 파일들이 GitHub Pages에 배포됩니다
3. 몇 분 후 웹사이트가 업데이트됩니다

## 🎨 커스터마이징

### 색상 변경

`styles.css` 파일에서 다음 부분을 수정하여 색상을 변경할 수 있습니다:

```css
/* 배경 그라디언트 */
background: linear-gradient(160deg, #0f0c29, #302b63, #24243e);

/* 카타카나 색상 */
.type-badge.katakana {
  background: rgba(59, 130, 246, 0.12);
  color: #93c5fd;
}
```

### 문자 데이터 수정

`app.js` 파일의 `K`(카타카나) 배열에서 문자와 발음을 수정할 수 있습니다.

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

기여는 언제나 환영합니다! 이슈를 열거나 풀 리퀘스트를 보내주세요.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

문제가 있거나 제안사항이 있으시면 이슈를 열어주세요.
