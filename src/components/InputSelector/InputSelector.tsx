import classes from './InputSelector.module.scss';
import { useState, useRef } from 'react';
import classnames from 'classnames';

export function InputSelector({ widthValue, className }) {
  const selectStyle = {
    width: widthValue,
  };
  const [Content, setContent] = useState('');
  const onChangeHanlder = (e) => {
    setContent(e.currentTarget.value);
    console.log(e.target.value);
  };

  const location = [
    { value: '종로구', label: '종로구' },
    { value: '중구', label: '중구' },
    { value: '용산구', label: '용산구' },
    { value: '성동구', label: '성동구' },
    { value: '광진구', label: '광진구' },
    { value: '동대문구', label: '동대문구' },
    { value: '중랑구', label: '중량구' },
    { value: '성북구', label: '성북구' },
    { value: '강북구', label: '강북구' },
    { value: '도봉구', label: '도봉구' },
    { value: '노원구', label: '노원구' },
    { value: '은평구', label: '은평구' },
    { value: '서대문구', label: '서대문구' },
    { value: '마포구', label: '마포구' },
    { value: '양천구', label: '양천구' },
    { value: '강서구', label: '강서구' },
    { value: '구로구', label: '구로구' },
    { value: '금천구', label: '금천구' },
    { value: '영등포구', label: '영등포구' },
    { value: '동작구', label: '동작구' },
    { value: '관악구', label: '관악구' },
    { value: '서초구', label: '서초구' },
    { value: '강남구', label: '강남구' },
    { value: '송파구', label: '송파구' },
    { value: '강동구', label: '강동구' },
  ];

  return (
    <select
      onChange={onChangeHanlder}
      className={classnames(classes['selectBox'], className)}
      style={selectStyle}
    >
      <option value="default">지역을 선택하세요</option>
      {location.map((item) => (
        <option key={item.value}>{item.label}</option>
      ))}
    </select>
  );
}
