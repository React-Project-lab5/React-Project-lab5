import { useState } from 'react';
import { Modal, ModalPotal } from '@/components/index';

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
          <Modal />
        </ModalPotal>
      )}
      <div id="root-modal"></div>
    </div>
  );
}
