import React,{useState} from 'react';
import { Chatbot, useChatbotContext } from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import "../styles/chatbot.css";
import config from '../chatbot/config.js';
import messageParser from '../chatbot/MessageParser.js';
import ActionProvider from '../chatbot/ActionProvider.js';
import "remixicon/fonts/remixicon.css";
import ChatbotHeader from '../chatbot/ChatbotHeader';

export default function MyChatbot({onClose}) {
  const { createChatbotMessage, setState } = useChatbotContext();
  const actionProvider = new ActionProvider(createChatbotMessage, setState);
  
  const [showBot, toggleBot] = useState(false);

  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('chat_messages'));
    return messages;
  };

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9998 }}></div>
      <div style={{ position: 'fixed', bottom: '0', right: '0', maxWidth: '300px', height: '400px', overflow: 'hidden', zIndex: 9999 }}>
        <ChatbotHeader />
        <div>
          <Chatbot
            config={config}
            actionProvider={actionProvider}
            messageHistory={loadMessages()}
            messageParser={messageParser}
            saveMessages={saveMessages}
          />
        </div>
        <button onClick={() => toggleBot((prev) => !prev)}>Bot</button>
      </div>
    </>
  );
};
