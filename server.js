const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const timestamp = new Date();
const timestampKST = new Date(timestamp.getTime() + 9 * 60 * 60 * 1000);
console.log(timestampKST.toISOString());


// Connection string (MongoDB Atlas에서 복사한 것)
const mongoURI = 'mongodb+srv://soyo2n5:r4564408@cluster0.mhrcekh.mongodb.net/happybirthday?retryWrites=true&w=majority&appName=Cluster0'

// DB 연결
mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB 연결 성공'))
  .catch(err => console.error('❌ MongoDB 연결 실패:', err));

  // JSON 데이터 파싱
app.use(express.json());

// 정적 파일 제공
app.use(express.static(__dirname));

// 루트 URL 처리
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const answerSchema = new mongoose.Schema({
  answer1: String,
  answer2: String,
  answer3: String,
  timestamp: String
});

const Answer = mongoose.model('Answer', answerSchema, 'answers');

app.post('/save-answer', async (req, res) => {
  try {
    const newAnswer = new Answer({
      answer1: req.body.q1,
      answer2: req.body.q2,
      answer3: req.body.q3,
      timestamp: new Date().toISOString()
    });
    await newAnswer.save();
    res.send('저장 완료');
  } catch (err) {
    console.error(err);
    res.status(500).send('저장 실패');
  }
});

const giftSchema = new mongoose.Schema({
  gift: String,
  timestamp: String
});

const Gift = mongoose.model('Gift', giftSchema, 'gifts');

app.post('/save-gift', async (req, res) => {
  try {
    const newGift = new Gift({
      gift: req.body.gift,
      timestamp: new Date().toISOString()
    });
    await newGift.save();
    res.send('선물이 저장되었습니다.');
  } catch (err) {
    console.error(err);
    res.status(500).send('저장 실패');
  }
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
