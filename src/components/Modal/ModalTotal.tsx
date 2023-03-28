/* eslint-disable jsx-a11y/aria-role */
import {
  Button,
  Input,
  InputSelector,
  Modal,
  ModalPotal,
} from '@/components/index';
import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import { debounce } from 'lodash';
import classes from './Modal.module.scss';
import DatePicker from 'react-datepicker';
import { useSetRecoilState } from 'recoil';
import 'react-datepicker/dist/react-datepicker.css';
import { titleMainState } from '@/@recoil/titleMainState';
import { MapContainer } from '../../utils/MapContainer/MapContainer';
import { detailMainState } from '@/@recoil/detailMainState';
import { cardDataState } from '../../@recoil/cardDataState';

export function ModalTotal({ createUsers, getUsers }: SearchFormProps) {
  const [modalOpened, setModalOpened] = useState(false);
  const [startDate, setStartDate] = useState(null);

  const setTitle = useSetRecoilState(titleMainState);
  const setDetail = useSetRecoilState(detailMainState);
  const setCardData = useSetRecoilState(cardDataState);

  const handleOpen = () => {
    setModalOpened(true);
  };

  const handleRegister = () => {
    setModalOpened(false);
    createUsers();
    getUsers();
    alert('모임이 작성되었습니다.');
  };

  const handleClose = () => {
    setModalOpened(false);
  };

  const handleDebounceTitle = debounce(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    },
    500
  );

  const handleDebounceDetail = debounce(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDetail(event.target.value);
    },
    500
  );

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
          <Modal role="popup" aria-labelledby="modal-pop">
            <h2 className={classes.popupTitle} id="modal-pop">
              모임 만들기
            </h2>
            <div className={classes.popupContent}>
              <MapContainer />

              <form onSubmit={handleRegister} className={classes['modalForm']}>
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
