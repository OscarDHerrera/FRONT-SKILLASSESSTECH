import { Modal } from 'react-bootstrap';
import { DeleteAlert } from "./AlertsApp"

export function ModalsApp({ showDelete, handleCloseDelete, selected, setSeverityResponse, setMessageResponse, handleShowAlert }) {

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
                <DeleteAlert handleCloseDelete={handleCloseDelete}
                    delete_id={selected}
                    setSeverityResponse={setSeverityResponse}
                    setMessageResponse={setMessageResponse}
                    handleShowAlert={handleShowAlert}
                />
            </Modal.Body>
        </Modal>
    )
}

