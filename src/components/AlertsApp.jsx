import * as React from 'react';
import {
    Snackbar,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    Divider
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Draggable from 'react-draggable';
import axios from 'axios';

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
    const nodeRef = React.useRef(null)

    function PaperComponent(props) {
        return (
            <Draggable
                handle="#draggable-dialog-title"
                cancel={'[class*="MuiDialogContent-root"]'}
                nodeRef={nodeRef}
            >
                <Paper {...props} />
            </Draggable>
        );
    }

    const deletePerson = () => {
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
        <Container fixed>
            <Dialog
                open={showDelete}
                onClose={handleCloseDelete}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                ref={nodeRef}
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title" ref={nodeRef}>
                    Eliminación de Usuario(s)
                </DialogTitle>
                <Divider sx={{ bgcolor: 'black' }} variant="middle" />
                <DialogContent>
                    <DialogContentText>
                        Al aceptar, éste usuario se eliminará
                        por completo de la Base de Datos y
                        no podrás recuperarlo
                    </DialogContentText>
                </DialogContent>
                <Divider sx={{ bgcolor: 'black' }} />
                <DialogActions>
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
                        onClick={(() => deletePerson())}
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
                </DialogActions>
            </Dialog>
        </Container>
    );
}