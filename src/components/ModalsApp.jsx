import { Modal } from 'react-bootstrap';
import { DeleteAlert } from "./AlertsApp"

export function ModalsApp({ showDelete, handleCloseDelete, selected }) {

    return (
        <Modal
            show={showDelete}
            onHide={handleCloseDelete}
        >
            <Modal.Header>
                <Modal.Title>
                    Eliminación de usuario
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DeleteAlert handleCloseDelete={handleCloseDelete} delete_id={selected} />
            </Modal.Body>
        </Modal>
    )
}

