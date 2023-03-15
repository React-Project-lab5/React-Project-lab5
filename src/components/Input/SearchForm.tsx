import classes from './SearchFrom.module.scss';
import { Input } from './Input';
import { InputSelector } from '../InputSelector/InputSelector';
import { Button } from '../Button';

export function SearchFrom() {
  return (
    <>
      <div className={classes['InputContainer']}>
        <div className={classes['mainInput']}>
          <InputSelector maxWidthValue={'200px'} heightValue={'75px'} />
          <Input
            maxWidthValue={'35rem'}
            heightValue={'75px'}
            labelText="검색창"
            isA11yHidden
          />
          <Button
            widthValue={'190px'}
            heightValue={'75px'}
            text="모임 만들기"
            backgroundColor={'orange'}
          />
        </div>
      </div>
    </>
  );
}
