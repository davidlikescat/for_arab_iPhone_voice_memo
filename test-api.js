const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('Testing API with sample text...\n');

    const testText = `
회의 날짜: 2025년 1월 15일
참석자: 김철수, 이영희
주제: 프로젝트 킥오프 미팅

김철수: 오늘 새로운 프로젝트를 시작합니다. 목표는 다음 달까지 MVP를 완성하는 것입니다.
이영희: 알겠습니다. 디자인 시안은 이번 주 금요일까지 준비하겠습니다.
김철수: 좋습니다. 다음 회의는 1월 20일로 잡겠습니다.
    `.trim();

    const response = await fetch('http://localhost:3000/api/process-note', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: testText })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ SUCCESS!');
      console.log('Status:', response.status);
      console.log('\nResponse:');
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log('❌ FAILED!');
      console.log('Status:', response.status);
      console.log('\nError:');
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

testAPI();
