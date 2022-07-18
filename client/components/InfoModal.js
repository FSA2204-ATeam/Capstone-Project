import React, { useRef } from "react";
import ReactDom from "react-dom";

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
        <h2>Welcome to Urban Safari!</h2>
        <h3>How to Start: </h3>
        <ul>
          <li>add more things here</li>
          <li>
            To add your event: Double click on the map to create your event.
          </li>
          <li>
            Click on the "Feeling Wild" button to start your adventure! This
            button will suggest you an event you may want to go to, based on
            your preferences.
          </li>
        </ul>
        <button
          className="modalCloseButton"
          onClick={() => setShowInfoModal(false)}
        >
          X
        </button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};
export default InfoModal;
