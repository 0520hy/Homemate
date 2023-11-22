import { createChatBotMessage } from 'react-chatbot-kit';
import ChatbotHeader from './ChatbotHeader';

const config = {
  initialMessages: [createChatBotMessage(`안녕하세요. HomeMate 챗봇입니다. 아래 기본 질문 5개에 대답해주세요!`)],
  customComponents: {
   
   header: (props) => <ChatbotHeader onCloseClick={props.onCloseClick} />,
    botAvatar: (props) => <img width='50px' src='/images/bot-avatar.png' {...props} />,
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: '#5D86EF',
    },
    
  },
};

export default config;
