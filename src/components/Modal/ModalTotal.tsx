import { useState } from 'react';
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

export function ModalTotal() {
  const [modalOpened, setModalOpened] = useState(false);
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );

  const handleOpen = () => {
    setModalOpened(true);
  };

  const handleClose = () => {
    setModalOpened(false);
  };

  return (
    <div className="App">
      <button onClick={handleOpen}>Open Modal</button>
      {modalOpened && (
        <ModalPotal closePortal={handleClose}>
          <Modal>
            <h2 className={classes.popupTitle}>모임 만들기</h2>
            <div className={classes.popupContent}>
              <div>
                <Input widthValue={300} heightValue={50} />
                <div className={classes.selector}>
                  <InputSelector widthValue={300} />
                </div>
                <Input widthValue={300} heightValue={50} />

                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
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
                  backgroundColor={'orange'}
                  className={classes.signupButton}
                  onClick={handleClose}
                />
              </div>
            </div>
          </Modal>
        </ModalPotal>
      )}
    </div>
  );
}
