import * as React from 'react';
import {
    Form, Modal
} from "react-bootstrap";
import axios from 'axios';
import { Snackbar, Button, Stack, Container } from '@mui/material';
import MuiAlert from '@mui/material/Alert';


/*-- Alerta de creación usuario --*/
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function AppAlert({ showAlert, handleCloseAlert, severityResponse, messageResponse }) {
    return (
        <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
            {
                severityResponse === "error" ? (
                    <Alert onClose={handleCloseAlert} severity={`${severityResponse}`} sx={{ width: '100%', bgcolor: '#ff1837' }}>
                        {messageResponse}
                    </Alert>
                ) :
                    (
                        <Alert onClose={handleCloseAlert} severity={`${severityResponse}`} sx={{ width: '100%' }}>
                            {messageResponse}
                        </Alert>
                    )
            }
        </Snackbar>
    )
}


/* -- Alerta de eliminación usurario -- */
export function DeleteAlert({ showDelete, handleCloseDelete, delete_id, setSeverityResponse, setMessageResponse, handleShowAlert, handleRefreshPage }) {

    const usersToDelete = { delete_id }
    const deletePerson = (e) => {
        e.preventDefault()
        axios
            .post(`http://10.40.100.57:8000/user/delete-user`, usersToDelete)
            .then((res) => {
                const responseStatus = res
                if (responseStatus.status === 200) {
                    setSeverityResponse("success")
                    setMessageResponse(responseStatus.data.message)
                    handleRefreshPage();
                    handleShowAlert();
                }
            })
            .catch((error) => {
                setSeverityResponse("error")
                setMessageResponse(error.response.data.message)
                handleRefreshPage();
                handleShowAlert();
            })
        handleCloseDelete();
    };

    return (
        <Container>
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
                    <Form onSubmit={deletePerson}>
                        <Form.Group>
                            <Form.Text>
                                ¿Está seguro(a) de eliminar este usuario?
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Text>
                                Al aceptar, éste usuario se eliminará
                                por completo de la Base de Datos y
                                no podrás recuperarlo
                            </Form.Text>
                        </Form.Group>
                        <Stack direction={"row"} spacing={2} mt={2} >
                            <Button
                                onClick={handleCloseDelete}
                                variant="contained"
                                sx={{
                                    color: '#ffffff', bgcolor: '#333333', ":hover": {
                                        color: '#ffffff', bgcolor: '#333333'
                                    }
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    color: '#333333', bgcolor: '#ff1837', ":hover": {
                                        color: '#ffffff', bgcolor: '#ff1837'
                                    }
                                }}
                            >
                                Aceptar
                            </Button>
                        </Stack>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}