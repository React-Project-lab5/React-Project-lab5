/* eslint-disable no-unused-vars */
import classes from './InputSelector.module.scss';
import classNames from 'classnames';
import { addressState } from '@/states/addressState';
import { useSetRecoilState } from 'recoil';
import { addressMainState } from '@/states/addressMainState';

interface Props {
  maxWidthValue: number;
  heightValue?: number;
  className: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  marginBottom?: number;
}

export function InputSelector({
  maxWidthValue,
  heightValue,
  className,
  marginBottom,
}: Props) {
  const selectStyle = {
    maxWidth: maxWidthValue,
    height: heightValue,
    className: className,
    marginBottom: marginBottom,
  };

  const setAddress = useSetRecoilState(addressState);
  const setMainAddress = useSetRecoilState(addressMainState);

  const location = [
    {
      value: '강남구',
      label: '강남구',
      address: '서울특별시 강남구 학동로 426',
    },
    {
      value: '강동구',
      label: '강동구',
      address: '서울특별시 강북구 도봉로89길 13',
    },
    {
      value: '강서구',
      label: '강서구',
      address: '서울특별시 강서구 화곡로 302',
    },
    {
      value: '관악구',
      label: '관악구',
      address: '서울특별시 관악구 관악로 145',
    },
    {
      value: '광진구',
      label: '광진구',
      address: '서울특별시 광진구 자양로 117',
    },
    {
      value: '구로구',
      label: '구로구',
      address: '서울특별시 구로구 가마산로 245',
    },
    {
      value: '금천구',
      label: '금천구',
      address: '서울특별시 금천구 시흥대로73길 70',
    },
    {
      value: '노원구',
      label: '노원구',
      address: '서울특별시 노원구 노해로 437',
    },
    {
      value: '도봉구',
      label: '도봉구',
      address: '서울특별시 도봉구 마들로 656',
    },
    {
      value: '동대문구',
      label: '동대문구',
      address: '서울특별시 동대문구 천호대로 145',
    },
    {
      value: '동작구',
      label: '동작구',
      address: '서울특별시 동작구 장승배기로 161',
    },
    {
      value: '마포구',
      label: '마포구',
      address: '서울특별시 마포구 월드컵로 212',
    },
    {
      value: '서대문구',
      label: '서대문구',
      address: '서울특별시 서대문구 연희로 248',
    },
    {
      value: '서초구',
      label: '서초구',
      address: '서울특별시 서초구 남부순환로 2584',
    },
    {
      value: '성동구',
      label: '성동구',
      address: '서울특별시 성동구 고산자로 270',
    },
    {
      value: '성북구',
      label: '성북구',
      address: '서울특별시 성북구 보문로 168',
    },
    {
      value: '송파구',
      label: '송파구',
      address: '서울특별시 송파구 올림픽로 326',
    },
    {
      value: '양천구',
      label: '양천구',
      address: '서울특별시 양천구 목동동로 105',
    },
    {
      value: '영등포구',
      label: '영등포구',
      address: '서울특별시 영등포구 당산동3가 당산로 123',
    },
    {
      value: '용산구',
      label: '용산구',
      address: '서울특별시 용산구 녹사평대로 150',
    },
    {
      value: '은평구',
      label: '은평구',
      address: '서울특별시 은평구 은평로 195',
    },
    {
      value: '종로구',
      label: '종로구',
      address: '서울특별시 종로구 종로1길 36',
    },
    { value: '중구', label: '중구', address: '서울특별시 중구 창경궁로 17' },
    {
      value: '중랑구',
      label: '중랑구',
      address: '서울특별시 중랑구 봉화산로 179',
    },
  ];

  return (
    <select
      onChange={(e) => {
        setMainAddress(e.target.value);
        for (let i = 0; i < location.length; i++) {
          if (e.target.value === location[i].value) {
            setAddress(location[i].address);
          }
        }
      }}
      className={classNames(classes['selectBox'], className)}
      style={selectStyle}
      required
    >
      <option value="default">지역을 선택하세요</option>
      {location.map((item) => (
        <option key={item.value}>{item.value}</option>
      ))}
    </select>
  );
}
