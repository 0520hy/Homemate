import React from 'react';
import axios from 'axios';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    for (let i = 1; i <= 5; i++) {
      axios.get(`http://ceprj.gachon.ac.kr:60014/chat/basic-question?index=${i}`)
        .then((response) => {
          const botMessage = createChatBotMessage(response.data);
          setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
