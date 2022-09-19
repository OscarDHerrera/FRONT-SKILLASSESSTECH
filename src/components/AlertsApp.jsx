import * as React from 'react';
import {
    Form
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
export function DeleteAlert({ handleCloseDelete, delete_id }) {

    const usersToDelete = { delete_id }

    const [severityResponse, setSeverityResponse] = React.useState("")
    const [messageResponse, setMessageResponse] = React.useState("")
    const [showAlert, setShowAlert] = React.useState(false)

    const handleShowAlert = () => setShowAlert(true);
    const handleCloseAlert = () => setShowAlert(false);


    const deletePerson = () => {
        console.log(usersToDelete)
        axios
            .post(`http://10.40.100.57:8000/user/delete-user`, usersToDelete)
            .then((response) => {
                if (response.data.code === 200) {
                    setSeverityResponse("success")
                    setMessageResponse(response.data.message)
                    handleShowAlert();
                }

            })
            .catch((error) => {
                console.log(error.response.data.message)
                setSeverityResponse("error")
                setMessageResponse(error.response.data.message)
                handleShowAlert();
            })
        handleCloseDelete();
    };

    return (
        <Container>
            <Form>
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
                        onClick={() => deletePerson()}
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
        </Container>
    );
}