import { useState } from 'react';
import {
  Button,
  Input,
  InputSelector,
  Modal,
  ModalPotal,
} from '@/components/index';
import classes from './Modal.module.scss';

export function ModalTotal() {
  const [modalOpened, setModalOpened] = useState(false);

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
            <div className={classes.popupContent}>
              <div>
                <Input widthValue={311} heightValue={59} />
                <InputSelector />
                <Input widthValue={311} heightValue={59} />
                <Input widthValue={311} heightValue={59} />
              </div>
              <div>
                <Input widthValue={311} heightValue={59} />
                <div className={classes.selector}>
                  <InputSelector widthValue={311} />
                </div>
                <Input widthValue={311} heightValue={59} />
                <Input widthValue={311} heightValue={59} />
                <Button />
              </div>
            </div>
          </Modal>
        </ModalPotal>
      )}
      <div id="root-modal"></div>
    </div>
  );
}
