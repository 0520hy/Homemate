import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ActionProvider(props) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      for (let i = 0; i < 5; i++) {
        try {
          const response = await axios.get(`http://ceprj.gachon.ac.kr:60014/chat/basic-question?index=${i}`);
          setQuestions(prevQuestions => [...prevQuestions, response.data]);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchQuestions();
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex >= questions.length) {
      return;
    }

    const botMessage = props.createChatBotMessage(questions[currentQuestionIndex]);

    props.setState(prev => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  return {
    handleNextQuestion,
  };
};

export default ActionProvider;
