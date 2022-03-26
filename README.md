# h662-GEMz

project 실습 from h662GEMz

## 배운것들

next 사용이유

- import fs 가 Module not found 에러 띄우는 경우 (서버 사이드에서 돌아가야하는데 클라에서 돌아가서 발생하는 에러) react에서는 웹팩 건드려야해서 어려운데 next에선 next.config.js 만 건드리면 되서 편함.

배포시 uri 입력할때 주의사항

- json 파일의 ipfs 주소를 입력해야함. image 말고

caver-js

- contract와 frontend가 통신하게 해주는 패키지

next/index.d.ts

- custom type이 필요할 때 적어두는 파일

hooks/index.tsx

- 코드 재사용을 위해 react hook처럼 컴포넌트를 만들어두려는 파일. 이 폴더는 next의 기본구성요소는 X

caverConfig.ts

- 컨트랙 관련 정보 기록하기 좋은 파일 (caver로 통신하므로 파일명도 그럴듯함)
