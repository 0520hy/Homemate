import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      for (let i = 1; i <= 5; i++) {
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

  const handleHello = () => {
    if (questions.length === 0) {
      return;
    }

    const botMessage = createChatBotMessage(questions[currentQuestionIndex]);

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
