import {
  Button,
  Input,
  InputSelector,
  Modal,
  ModalPotal,
} from '@/components/index';
import classes from './Modal.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MapContainer } from './../../utils/MapContainer';
import { useState } from 'react';
import { debounce } from 'lodash';
import { useSetRecoilState } from 'recoil';
import { cardDataState } from './../../states/cardDataState';
import React from 'react';
//import { Form } from './Form';

export function ModalTotal({
  createUsers,
  getUsers,
  setTitle,
  setAddress,
  setDetail,
}: SearchFormProps) {
  const [modalOpened, setModalOpened] = useState(false);
  const [startDate, setStartDate] = useState(null);

  const setCardData = useSetRecoilState(cardDataState);

  const handleOpen = () => {
    setModalOpened(true);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalOpened(false);
    createUsers();
    getUsers();
  };

  const handleClose = () => {
    setModalOpened(false);
  };

  const handleDebounceTitle = debounce((event) => {
    setTitle(event.target.value);
    console.log(event.target.value);
  }, 500);

  const handleDebounceDetail = debounce((event) => {
    setDetail(event.target.value);
    console.log('input onChange 확인', event);
  }, 500);

  const handleOnChangeTown = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAddress(event.target.value);
    console.log(event.target);
  };

  return (
    <React.Fragment>
      <Button
        maxWidthValue={'190px'}
        heightValue={'75px'}
        text="모임 만들기"
        backgroundColor={'orange'}
        className={classes.MeetingButton}
        onClick={handleOpen}
      />
      {modalOpened && (
        <ModalPotal closePortal={handleClose}>
          <Modal>
            <h2 className={classes.popupTitle}>모임 만들기</h2>
            <div className={classes.popupContent}>
              <MapContainer />

              <form onSubmit={handleRegister}>
                <div className={classes['modalSearch']}>
                  <Input
                    maxWidthValue={300}
                    heightValue={50}
                    labelText={'모임만들기 제목'}
                    isA11yHidden={true}
                    placeHolder={'제목을 입력하세요'}
                    onChange={handleDebounceTitle}
                  />
                  <InputSelector
                    maxWidthValue={300}
                    className={classes.selector}
                    onChange={handleOnChangeTown}
                    marginBottom={6}
                  />
                  <Input
                    maxWidthValue={300}
                    heightValue={50}
                    labelText={'모임만들기 위치'}
                    isA11yHidden={true}
                    placeHolder={'상세한 모임위치를 적으세요'}
                    onChange={handleDebounceDetail}
                  />
                  <DatePicker
                    selected={startDate}
                    onChange={(date: object) => {
                      setStartDate(date);
                      setCardData(String(date).substring(0, 21));
                    }}
                    closeOnScroll={true}
                    showTimeSelect
                    dateFormat="yy/MM/dd | aa h:mm"
                    isClearable
                    placeholderText="날짜를 선택하세요"
                    className={classes.datePicker}
                    showDisabledMonthNavigation
                  />
                  <Button
                    maxWidthValue={300}
                    heightValue={50}
                    text={'모임 만들기'}
                    type={'submit'}
                    backgroundColor={'orange'}
                    className={classes.signupButton}
                  />
                </div>
              </form>
            </div>
          </Modal>
        </ModalPotal>
      )}
    </React.Fragment>
  );
}
