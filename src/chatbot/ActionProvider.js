import React from 'react';
import axios from 'axios';

class ActionProvider {
  constructor(createChatbotMessage, setStateFunc) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
    this.questions = [];
    this.currentQuestionIndex = 0;
  }

  fetchQuestions = async () => {
    for (let i = 1; i < 5; i++) {
      try {
        const response = await axios.get(`http://ceprj.gachon.ac.kr:60014/chat/basic-question?index=${i}`);
        this.questions = [...this.questions, response.data];
      } catch (error) {
        console.log(error);
      }
    }
    this.handleHello();
  };

  handleHello = () => {
    if (this.questions.length === 0 || this.currentQuestionIndex >= this.questions.length) {
      return;
    }

    const botMessage = this.createChatbotMessage(this.questions[this.currentQuestionIndex]);

    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, botMessage],
    }));

    this.currentQuestionIndex += 1;
  };

  updateChatbotState = (message) => {
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message]
    }));
  }
}

export default ActionProvider;
