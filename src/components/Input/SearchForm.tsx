import classes from './SearchFrom.module.scss';
import { Input } from './Input';
import { InputSelector } from '../InputSelector/InputSelector';
import { Button } from '../Button';
import { ModalTotal } from '@/components/index';
import { useNavigate } from 'react-router-dom';

export function SearchFrom({ createUsers, getUsers }: SearchFormProps) {
  const movePage = useNavigate();

  const goChatPage = () => {
    movePage('/chat');
  };

  return (
    <>
      <div className={classes['InputContainer']}>
        <div className={classes['mainInput']}>
          <InputSelector
            maxWidthValue={200}
            heightValue={75}
            className={classes.searchFormInputSelector}
          />
          <div className={classes['inputSearchButton']}>
            <Input
              maxWidthValue={'35rem'}
              heightValue={'75px'}
              labelText="검색창"
              isA11yHidden
              className={classes.searchFormInput}
            />
            <button
              className={classes['searchButton']}
              type="button"
              aria-label="검색 버튼"
            >
              <img src="/public/assets/search.svg" alt="검색 버튼" />
            </button>
          </div>
          <ModalTotal createUsers={createUsers} getUsers={getUsers} />

          <Button
            maxWidthValue={'190px'}
            heightValue={'75px'}
            text="채팅 하기"
            backgroundColor={'orange'}
            className={classes.ChatButton}
            onClick={goChatPage}
          />
        </div>
      </div>
    </>
  );
}
