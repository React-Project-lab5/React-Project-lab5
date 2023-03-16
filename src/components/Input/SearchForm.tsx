import classes from './SearchFrom.module.scss';
import { Input } from './Input';
import { InputSelector } from '../InputSelector/InputSelector';
import { Button } from '../Button';
import { ModalTotal } from '@/components/index';

export function SearchFrom({
  setTitle,
  setAddress,
  setDetail,
  createUsers,
  getUsers,
}) {
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
          <ModalTotal
            setTitle={setTitle}
            setAddress={setAddress}
            setDetail={setDetail}
            createUsers={createUsers}
            getUsers={getUsers}
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
