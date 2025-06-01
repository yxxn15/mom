const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// JSON 데이터 파싱
app.use(express.json());

// 정적 파일 제공
app.use(express.static(__dirname));

// 루트 URL 처리
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// POST 요청 처리
app.post('/save-answer', (req, res) => {
  const answer = req.body.answer;
  const timestamp = new Date().toISOString();
  const entry = `날짜: ${timestamp}\n답변: ${answer}\n\n`;
  fs.appendFile('answers.txt', entry, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('저장 실패');
    } else {
      res.send('저장 완료');
    }
  });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
