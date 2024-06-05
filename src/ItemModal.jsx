import React from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
function ItemModal({ save, setSelectedItem, isOpen, setIsOpen, selectedItem }) {
  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)}>
      <Modal.Header>Eidt item</Modal.Header>
      <Modal.Body>
        <input
          type=" text"
          onChange={(e) => {
            setSelectedItem(e.target.value);
          }}
          className="w-100"
          value={selectedItem}
        />
      </Modal.Body>
      <Modal.Footer>
        <button onClick={() => setIsOpen(false)} className="btn btn-danger">
          Close
        </button>
        <Button onClick={save}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ItemModal;
