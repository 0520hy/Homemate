import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';

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
            options: [
              { value: '아파트', label: '아파트', trigger: '3' },
              { value: '빌라', label: '빌라', trigger: '3' },
              { value: '원룸', label: '원룸', trigger: '3' },
              { value: '오피스텔', label: '오피스텔', trigger: '3' },
            ],
          },
          {
            id: '3',
            message: '매매/전세/월세 중 원하는 주거 형태는 무엇인가요? 단어 형태로 답변해주세요!',
            trigger: 'residentail',
          },
          {
            id: 'residentail',
            options: [
              { value: '매매', label: '매매', trigger: '5' },
              { value: '전세', label: '전세', trigger: '5' },
              { value: '월세', label: '월세', trigger: '5' },
            ],
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
            message: '희망하는 가격대를 알려주세요. (만원 단위로 입력) 월세의 경우 보증금/월세 형태로 입력해주세요!',
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
            asMessage: true,
            trigger: '13',
          },
          {
            id: '13',
            message: '사용자님 맞춤형 매물을 추천해드릴게요! 추가로 원하는 조건을 문장으로 말씀해주세요. 없으면 [아니요]를 입력해주세요',
            trigger: 'review',
          },
          {
            id: 'update',
            message: 'Would you like to update some field?',
            trigger: 'update-question',
          },
          {
            id: 'update-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'update-yes' },
              { value: 'no', label: 'No', trigger: 'end-message' },
            ],
          },
          {
            id: 'update-yes',
            message: 'What field would you like to update?',
            trigger: 'update-fields',
          },
          {
            id: 'update-fields',
            options: [
              { value: 'name', label: 'Name', trigger: 'update-name' },
              { value: 'gender', label: 'Gender', trigger: 'update-gender' },
              { value: 'age', label: 'Age', trigger: 'update-age' },
            ],
          },
          {
            id: 'update-name',
            update: 'name',
            trigger: '7',
          },
          {
            id: 'update-gender',
            update: 'gender',
            trigger: '7',
          },
          {
            id: 'update-age',
            update: 'age',
            trigger: '7',
          },
          {
            id: 'end-message',
            message: 'Thanks! Your data was submitted successfully!',
            end: true,
          },
        ]}
      />
    );
  }
}

export default A;