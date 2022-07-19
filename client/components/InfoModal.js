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
        <p>
          Urban Safari is a roulette style guide to the wildlife of NYC. Using
          proximity-based mapping, event listing APIs and community sourced
          parties, this guide application provides users with recommended
          events.{" "}
        </p>
        <h3>How to Start: </h3>
        <ul>
          <li>
            Sign up and log in using the button in the top left of the screen
          </li>
          <li>
            To add your event: Double click on the map to create your event.
          </li>
          <li>
            Click on the "Feeling Wild" button to start your adventure! This
            button will suggest a random event. Use the provided buttons to
            accept or proceed to the next random event.
          </li>
          <li>
            Click on the "Feeling Wild" button to start your adventure! This
            button will suggest a random event. Use the provided buttons to
            accept or proceed to the next random event.
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
