import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#5280F7',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#D9D9D9',
  botFontColor: '#4a4a4a',
  userBubbleColor: '#CED5E8',
  userFontColor: '#4a4a4a',
};

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      building: '',
      residentail: '',
      location: '',
      price: '',
      scope: '',
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { building, residentail, location, price, scope} = steps;

    this.setState({ building, residentail, location, price, scope });
  }

  render() {
    const { building, residentail, location, price, scope } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h4>***사용자 희망 조건***</h4>
        <table>
          <tbody>
            <tr>
              <td>공간 형태:   </td>
              <td>{building.value}</td>
            </tr>
            <tr>
              <td>주거 형태:   </td>
              <td>{residentail.value}</td>
            </tr>
            <tr>
              <td>지역:   </td>
              <td>{location.value}</td>
            </tr>
            <tr>
              <td>금액:   </td>
              <td>{price.value}</td>
            </tr>
            <tr>
              <td>전용 면적:   </td>
              <td>{scope.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

class Submit extends Component {
  handleSubmit = async (event) => {
    console.log('Button clicked');
    event.preventDefault();
  
    const { steps, triggerNextStep } = this.props;
    if (!steps) return;
  
    const { value: building } = steps.building || {};
    const { value: residentail } = steps.residentail || {};
    const { value: location } = steps.location || {};
    const { value: price } = steps.price || {};
    const { value: scope } = steps.scope || {};
    const { value: additionalConditions } = steps.additionalConditions || {};
  
    const data = {
      building: building || '',
      residentail: residentail || '',
      location: location || '',
      price: parseInt(price) || 0,
      scope: parseInt(scope) || 0,
      additionalConditions: additionalConditions || '',
    };
    console.log(data);
    try {
      const response = await axios.post('http://ceprj.gachon.ac.kr:60015/model', data);
      console.log(response.data);
      triggerNextStep({ message: response.data.replace(/\n/g, ' ')});
    } catch (error) {
      console.error(error);
      triggerNextStep();
    }
  };
    render() {
    return (
      <div>
       <button onClick={this.handleSubmit}>확인</button>
      </div>
    );
    }
}

class MyChatbot extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
      <ChatBot 
      floating
      botAvatar="/images/bot-avatar.png"
      userAvatar="/images/user-avatar.png"
      headerTitle="HOMEMATE CHATBOT"
        steps={[
          {
            id: '1',
            message: '아파트/빌라/원룸/오피스텔 중 원하는 공간 형태는 무엇인가요?',
            trigger: 'building',
          },
          {
            id: 'building',
            user: true,
            trigger: '3'
          },
          {
            id: '3',
            message: '매매/전세/월세 중 원하는 주거 형태는 무엇인가요? 단어 형태로 답변해주세요!',
            trigger: 'residentail',
          },
          {
            id: 'residentail',
            user: true,
            trigger: '5',
          },
          {
            id: '5',
            message: '서울/성남 범위 이내 원하는 지역을 선택해주세요.(예시: 경기도 성남시 복정동) 만약 여러 지역을 원하시면 띄어쓰기로 구분해서 입력해주세요.',
            trigger: 'location',
          },
          {
            id: 'location',
            user: true,
            trigger: '7',
          },
          {
            id: '7',
            message: '희망하는 가격대를 알려주세요. (만원 단위로 숫자로 입력) 월세의 경우 보증금/월세(예시: 3000/50) 형태로 입력해주세요!',
            trigger: 'price',
          },
          {
            id: 'price',
            user: true,
            trigger: '9',
          },
          {
            id: '9',
            message: '원하시는 전용면적을 알려주세요. 단, 숫자만 입력해주세요',
            trigger: 'scope',
          },
          {
            id: 'scope',
            user: true,
            trigger: 'review',
          },
          {
            id: 'review',
            component: <Review />,
            trigger: '12', 
          },
          {
            id: '12',
            message: '추가로 원하는 조건 문장으로 하나씩 말씀해주세요.  (예시: 근처에 편의점이 있었으면 좋겠어요!)',
            trigger: 'additionalConditions',
          },
          {
            id: 'additionalConditions',
            user: true,
            trigger: '14',     
          },
          {
            id: '14',
            message: '추가로 원하시는 조건이 있으신가요?',
            trigger:'optional'
          },
          {
            id: "optional",
            options: [
              { value: 'yes', label: '네', trigger: '12' },
              { value: 'no', label: '아니요', trigger: 'wait-message' },
            ]
          },
          {
            id: 'wait-message',
            message: '사용자님 맞춤형 매물을 추천해드릴게요! 잠시만 기다려주세요...',
            trigger: 'submit-button',
          },
          {
            id: 'submit-button',
            component: <Submit/>,
            waitAction: true,
            trigger: 'end-message',
          },
          {
            id: 'end-message',
            message: "{previousValue}",
          },
        ]}
      />
      </ThemeProvider>
    );
  }
}

export default MyChatbot;
