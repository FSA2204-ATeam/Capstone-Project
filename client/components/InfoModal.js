import React, { useRef } from 'react';
import ReactDom from 'react-dom';

const InfoModal = ({ setShowInfoModal }) => {
  const infoModalRef = useRef();
  const closeInfoModal = (e) => {
    if (e.target === infoModalRef.current) {
      setShowInfoModal(false);
    }
  };

  return ReactDom.createPortal(
    <div className="container" ref={infoModalRef} onClick={closeInfoModal}>
      <div className="modal">
        <h2>Wellcome to Urban Safari!</h2>
        <h3>Learn how to use the app.</h3>
        <button
          className="modalCloseButton"
          onClick={() => setShowInfoModal(false)}
        >
          X
        </button>
      </div>
    </div>,
    document.getElementById('portal')
  );
};
export default InfoModal;
