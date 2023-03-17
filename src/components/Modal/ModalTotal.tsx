import {
  Button,
  Input,
  InputSelector,
  Modal,
  ModalPotal,
} from '@/components/index';
import classes from './Modal.module.scss';
import DatePicker from 'react-datepicker';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import 'react-datepicker/dist/react-datepicker.css';
import { MapContainer } from './../../utils/MapContainer';
import { useState } from 'react';
import { debounce } from 'lodash';
import { useSetRecoilState } from 'recoil';
import { cardDataState } from './../../states/cardDataState';

export function ModalTotal({
  createUsers,
  getUsers,
  setTitle,
  setAddress,
  setDetail,
}) {
  const [modalOpened, setModalOpened] = useState(false);
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );

  const setCardData = useSetRecoilState(cardDataState);

  const handleOpen = () => {
    setModalOpened(true);
  };

  const handleRegister = () => {
    setModalOpened(false);
    createUsers();
    getUsers();
  };

  const handleClose = () => {
    setModalOpened(false);
  };

  return (
    <div className="App">
      <Button
        widthValue={'190px'}
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
              <div>
                <Input
                  widthValue={300}
                  heightValue={50}
                  placeHolder={'제목을 입력하세요'}
                  onChange={debounce((event) => {
                    setTitle(event.target.value);
                  }, 500)}
                />
                <InputSelector
                  maxWidthValue={300}
                  className={classes.selector}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />

                <Input
                  widthValue={300}
                  heightValue={50}
                  placeHolder={'상세한 모임위치를 적으세요'}
                  onChange={debounce((event) => {
                    setDetail(event.target.value);
                  }, 500)}
                />

                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setCardData(String(date).substring(0, 21));
                  }}
                  closeOnScroll={true}
                  showTimeSelect
                  dateFormat="yy/MM/dd | aa h:mm"
                  isClearable
                  placeholderText="날짜를 선택하세요"
                  className={classes.datePicker}
                />
                <Button
                  widthValue={300}
                  heightValue={50}
                  text={'모임 만들기'}
                  type={'submit'}
                  backgroundColor={'orange'}
                  className={classes.signupButton}
                  onClick={handleRegister}
                />
              </div>
            </div>
          </Modal>
        </ModalPotal>
      )}
    </div>
  );
}
