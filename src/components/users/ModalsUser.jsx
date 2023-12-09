import * as React from 'react';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Divider,
  TextField
} from '@mui/material';
import {
  Form
} from 'react-bootstrap';
import Draggable from 'react-draggable';
import axios from 'axios';
import { GetUser } from './service/ServiceUser'


/* -- Modal de eliminación usurario -- */


export function DeleteUser({ showDelete, handleCloseDelete, delete_id, setSeverityResponse, setMessageResponse, handleShowAlert, handleRefreshPage }) {

  const usersToDelete = { delete_id }
  const nodeRef = React.useRef(null)

  if (!showDelete) {
    return null
  }

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

  const deleteUser = () => {
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
            onClick={(() => deleteUser())}
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



export function EditUser({ showUpdate, handleCloseUpdate, update_id, setSeverityResponse, setMessageResponse, handleShowAlert, handleRefreshPage }) {

  const [updatePerson, setUpdatePerson] = React.useState({
    role: "",
    email: "",
    name: "",
    last_name: ""
  });

  React.useEffect(() => {
    if (showUpdate === true) {
      GetUser({ update_id }).then((userToUpdate) => {
        setUpdatePerson({
          role: userToUpdate.role,
          email: userToUpdate.email,
          name: userToUpdate.name,
          last_name: userToUpdate.last_name
        })
      })
    }
  }, [showUpdate, update_id])


  if (!showUpdate) {
    return null
  }

  const handleUpdateChange = (e) => {
    const { name, value } = e.target
    setUpdatePerson({
      ...updatePerson,
      [name]: value
    });
  };


  const handleSubmit = (e) => {
    console.log(updatePerson)
    axios
      .put(`http://10.40.100.57:8000/user/update_user/${update_id}`, updatePerson
      ).then((res) => {
        const responseStatus = res
        if (responseStatus.status === 200) {
          setSeverityResponse("success")
          setMessageResponse(responseStatus.data.message)
          handleRefreshPage();
          handleShowAlert();
        }
      })
      .catch((error) => {
        console.log(error)
        setSeverityResponse("error")
        setMessageResponse(error.message)
        handleRefreshPage();
        handleShowAlert();
      })
    handleCloseUpdate();
  }

  return (
    <Container>
      <Dialog
        open={showUpdate}
        onClose={handleCloseUpdate}
      >
        <DialogTitle style={{ cursor: 'default' }}>
          Actualización datos de Usuario
        </DialogTitle>
        <Divider sx={{ bgcolor: 'black' }} variant="middle" />
        <DialogContent sx={{ textAlign: 'center' }}>
          <Form>
            <TextField
              name="role"
              id="role"
              label="Rol del usuario"
              variant="standard"
              sx={{ margin: '6px' }}
              value={updatePerson.role}
              onChange={handleUpdateChange}
            />
            <TextField
              name="email"
              id="email"
              label="Email"
              type={'email'}
              variant="standard"
              sx={{ margin: '6px' }}
              value={updatePerson.email}
              onChange={handleUpdateChange}
            />
            <TextField
              name="name"
              id="name"
              label="Nombre"
              variant="standard"
              sx={{ margin: '6px' }}
              value={updatePerson.name}
              onChange={handleUpdateChange}
            />
            <TextField
              name="last_name"
              id="last_name"
              label="Apellido"
              variant="standard"
              sx={{ margin: '6px' }}
              value={updatePerson.last_name}
              onChange={handleUpdateChange}
            />
          </Form>
        </DialogContent>
        <Divider sx={{ bgcolor: 'black' }} />
        <DialogActions>
          <Button
            onClick={handleCloseUpdate}
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
            onClick={() => handleSubmit()}
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
  )
}

