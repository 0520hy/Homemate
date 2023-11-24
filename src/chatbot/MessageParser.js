import React from 'react';
import axios from 'axios';

const MessageParser = ({ children, actions }) => {
  const questions = [
    "아파트/빌라/원룸/오피스텔 중 원하는 공간 형태는 무엇인가요? 단어 형태로 답변해주세요:",
    "매매/전세/월세 중 원하는 주거 형태는 무엇인가요? 단어 형태로 답변해주세요:",
    "서울/성남 범위 이내 원하는 지역을 선택해주세요.(예시: 경기도 성남시 복정동) 만약 여러 지역을 원하시면 띄어쓰기로 구분해서 입력해주세요.",
    "희망하는 가격대를 알려주세요(만원 단위로 입력) 월세의 경우 보증금/월세 형태로 입력해주세요:",
    "원하시는 전용면적을 알려주세요. 단, 숫자만 입력해주세요",
    "사용자님 맞춤형 매물을 추천해드릴게요! 추가로 원하는 조건을 문장으로 말씀해주세요. 없으면 '아니요'를 입력해주세요",
    "원하는 추가 조건이 더 있으신가요? 없으면 아니요를 입력해주세요",
    "원하는 추가 조건이 더 있으신가요? 없으면 아니요를 입력해주세요",
    "원하는 추가 조건이 더 있으신가요? 없으면 아니요를 입력해주세요",
    "원하는 추가 조건이 더 있으신가요? 없으면 아니요를 입력해주세요",
    "원하는 추가 조건이 더 있으신가요? 없으면 아니요를 입력해주세요",
    "원하는 추가 조건이 더 있으신가요? 없으면 아니요를 입력해주세요",
    "원하는 추가 조건이 더 있으신가요? 없으면 아니요를 입력해주세요",
    "원하는 추가 조건이 더 있으신가요? 없으면 아니요를 입력해주세요",
    "원하는 추가 조건이 더 있으신가요? 없으면 아니요를 입력해주세요",
    "원하는 추가 조건이 더 있으신가요? 없으면 아니요를 입력해주세요",
    "원하는 추가 조건이 더 있으신가요? 없으면 아니요를 입력해주세요",
    "원하는 추가 조건이 더 있으신가요? 없으면 아니요를 입력해주세요",
    "원하는 추가 조건이 더 있으신가요? 없으면 아니요를 입력해주세요",
    "원하는 추가 조건이 더 있으신가요? 없으면 아니요를 입력해주세요",
    "원하는 추가 조건이 더 있으신가요? 없으면 아니요를 입력해주세요",
    "원하는 추가 조건이 더 있으신가요? 없으면 아니요를 입력해주세요"
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

  const handleAnswer = (answer) => {
    actions.handleQuestionAnswer(answer);

    // 다음 질문으로 넘어감
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const parse = async (message) => {
    if (message === '아니요') {
      // 추가 조건이 없음을 처리하는 로직을 여기에 작성합니다.
      actions.handleNoAdditionalConditions();
      setCurrentQuestionIndex(questions.length); // 모든 질문에 대한 답변이 완료되었음을 설정합니다.
    } else {
      // 추가 조건이 있는 경우를 처리하는 로직을 여기에 작성합니다.
      actions.handleAdditionalCondition(message);
    }
  };

  const BasicQuestion = ({ question, onAnswer }) => {
    return (
      <div>
        <p>{question}</p>
        <input type="text" onChange={(e) => onAnswer(e.target.value)} />
      </div>
    );
  };

  return (
    <div>
      {currentQuestionIndex < questions.length ? (
        <BasicQuestion
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
        />
      ) : null}
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;
