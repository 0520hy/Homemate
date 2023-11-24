// // in ActionProvider.jsx
// import React from 'react';

// const ActionProvider = ({ createChatBotMessage, setState, children }) => {
//   const handleHello = () => {
//     const botMessage = createChatBotMessage('Hello. Nice to meet you.');

//     setState((prev) => ({
//       ...prev,
//       messages: [...prev.messages, botMessage],
//     }));
//   };

//   const handleAdditionalCondition = (condition) => {
//     // 추가 조건을 처리하는 로직을 여기에 작성해주세요.
//     console.log('추가 조건:', condition);
//   };

//   return (
//     <div>
//       {React.Children.map(children, (child) => {
//         return React.cloneElement(child, {
//           actions: {
//             handleHello,
//             handleAdditionalCondition, // handleAdditionalCondition 함수를 actions 객체에 추가합니다.
//           },
//         });
//       })}
//     </div>
//   );
// };

// export default ActionProvider;
