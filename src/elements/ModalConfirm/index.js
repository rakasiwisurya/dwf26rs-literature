import { Modal, Button } from "react-bootstrap";
import "./index.scss";

export default function ModalConfirm({ show, handleClose, handleDelete }) {
  return (
    <Modal show={show} onHide={handleClose} className="confirmation">
      <Modal.Body>
        <p className="fs-5">Are you sure want to delete this one?</p>

        <div className="button-group">
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
