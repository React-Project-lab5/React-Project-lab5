import classes from './SearchFrom.module.scss';
import { Input } from './Input';
import { InputSelector } from '../InputSelector/InputSelector';
import { Button } from '../Button';

export function SearchFrom() {
  return (
    <>
      <div className={classes['InputContainer']}>
        <div className={classes['mainInput']}>
          <InputSelector
            widthValue={'200px'}
            heightValue={'75px'}
            className={classes.searchFormInputSelector}
          />
          <Input
            maxWidthValue={'35rem'}
            heightValue={'75px'}
            labelText="검색창"
            isA11yHidden
            className={classes.searchFormInput}
          />
          <Button
            widthValue={'190px'}
            heightValue={'75px'}
            text="모임 만들기"
            backgroundColor={'orange'}
            className={classes.MeetingButton}
          />

          <Button
            widthValue={'190px'}
            heightValue={'75px'}
            text="채팅 하기"
            backgroundColor={'orange'}
            className={classes.ChatButton}
          />
        </div>
      </div>
    </>
  );
}
