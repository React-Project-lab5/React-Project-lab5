import classNames from 'classnames';
import { useSetRecoilState } from 'recoil';
import classes from './InputSelector.module.scss';
import { addressState } from '@/@recoil/addressState';
import { addressMainState } from '@/@recoil/addressMainState';
import locationData from '@/data/locationData.json';

interface Props {
  maxWidthValue: number;
  heightValue?: number;
  className: string;
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

  return (
    <>
      <label htmlFor="select" className="a11yHidden">
        지역선택
      </label>
      <select
        id="select"
        onChange={(e) => {
          const selectedValue = e.target.value;
          const selectedLocation = locationData.find(
            (item) => item.value === selectedValue
          );

          if (selectedLocation) {
            setAddress(selectedLocation.address);
            setMainAddress(selectedValue);
          }
        }}
        className={classNames(classes['selectBox'], className)}
        style={selectStyle}
        required
      >
        {locationData.map((item) => (
          <option key={item.id}>{item.value}</option>
        ))}
      </select>
    </>
  );
}
