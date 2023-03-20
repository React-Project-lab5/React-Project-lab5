import { MapContainer } from './../../utils/MapContainer';
import {
  Button,
  Input,
  InputSelector,
  ModalPotal,
  Modal,
} from '@/components/index';
import classes from './Modal.module.scss';
import DatePicker from 'react-datepicker';
import { useState } from 'react';

export const ReadMeetings = ({ openModal, setOpenModal }) => {
  console.log(openModal);

  const [startDate, setStartDate] = useState(null);

  const handleRegister = () => {
    setOpenModal(false);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      {openModal && (
        <ModalPotal closePortal={handleClose}>
          <Modal>
            <div className={classes.popupContent}>
              <MapContainer />

              <div className={classes['readMeetingContainer']}>
                <Input
                  maxWidthValue={300}
                  heightValue={50}
                  labelText={'모임만들기 제목'}
                  isA11yHidden={true}
                  placeHolder={'제목을 입력하세요'}
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
                />
                <DatePicker
                  selected={startDate}
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
                  text={'탈퇴하기'}
                  backgroundColor={'red'}
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
};
