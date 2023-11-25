import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import axios from 'axios';

//리뷰
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
        <h4>사용자 희망 조건</h4>
        <table>
          <tbody>
            <tr>
              <td>공간 형태: </td>
              <td>{building.value}</td>
            </tr>
            <tr>
              <td>주거 형태: </td>
              <td>{residentail.value}</td>
            </tr>
            <tr>
              <td>지역: </td>
              <td>{location.value}</td>
            </tr>
            <tr>
              <td>금액: </td>
              <td>{price.value}</td>
            </tr>
            <tr>
              <td>전용 면적: </td>
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

//post
class Submit extends Component {
  handleSubmit = async (event) => {
    console.log('Button clicked');
    event.preventDefault(); // 기본 동작 막기
    
    const { steps, triggerNextStep } = this.props;
    if (!steps) return; // steps 객체가 없는 경우 처리
    
    const { value: building } = steps.building || {};
    const { value: residentail } = steps.residentail || {};
    const { value: location } = steps.location || {};
    const { value: price } = steps.price || {};
    const { value: scope } = steps.scope || {};
    const additionalConditions = steps
      .filter(step => step.id.startsWith('additionalConditions'))
      .map(step => step.value);

    
    // 데이터 형식 변환
    const data = {
      building: building || '',
      residentail: residentail || '',
      location: location || '',
      price: parseInt(price) || 0,
      scope: parseInt(scope) || 0,
      additionalConditions: additionalConditions || [],
    };
    console.log(data); // 여기에 추가
    try {
      const response = await axios.post('http://ceprj.gachon.ac.kr:60015/model', data);
      // POST 요청 성공 시 처리할 로직 작성
      console.log(response.data);
      // 응답 값을 상태 변수에 저장
      triggerNextStep({ value: response.data,  });
    } catch (error) {
      console.error(error);
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

class A extends Component {

  render() {
    
    return (
      <ChatBot
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
            Message: true,
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
              { value: 'no', label: '아니요', trigger: 'wait-message' },]
          },
          {
            id: 'wait-message',
            message: '사용자님 맞춤형 매물을 추천해드릴게요! 잠시만 기다려주세요...',
            component: <Submit/>,
            trigger: '17'
          },
          {
            id: '17',
            component: <Submit />,
            Message: true,
          },
         
        ]}
      />
    );
  }
}

export default A;
