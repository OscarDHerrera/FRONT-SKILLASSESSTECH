import React from 'react';
import {
  Form
} from 'react-bootstrap';

import {
  Button,
  TextField,
  Container
} from '@mui/material';

import axios from 'axios';
import { AppAlert } from "../../commons/AppAlert";

export default function FormPerson() {

  const [newPerson, setNewPerson] = React.useState({
    role: "",
    email: "",
    name: "",
    last_name: "",
    password: "",
  });

  const [severityResponse, setSeverityResponse] = React.useState("")
  const [messageResponse, setMessageResponse] = React.useState("")
  const [showAlert, setShowAlert] = React.useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewPerson({
      ...newPerson,
      [name]: value
    });
  };

  const handleShowAlert = () => setShowAlert(true);
  const handleCloseAlert = () => setShowAlert(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://10.40.100.57:8000/user/create_user", newPerson
      ).then((res) => {
        const responseStatus = res
        if (responseStatus.status === 201) {
          setSeverityResponse("success")
          setMessageResponse(responseStatus.data.message)
          setNewPerson({
            ...newPerson,
            role: "",
            email: "",
            name: "",
            last_name: "",
            password: ""
          })
          handleShowAlert();
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setSeverityResponse("info")
          setMessageResponse(error.response.data.message)
          handleShowAlert();
        } else if (error.response.status === 422) {
          setSeverityResponse("info")
          setMessageResponse(error.response.data.detail[0].msg)
          handleShowAlert();
        } else {
          setSeverityResponse("error")
          setMessageResponse(error.message)
          handleShowAlert();
        }
      }
      );
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>

        <TextField
          fullWidth
          required
          name="role"
          id="role"
          label="Rol del usuario"
          variant="standard"
          helperText="Ingresa el Rol que tendrá el usuario"
          value={newPerson.role}
          onChange={handleInputChange}
        />

        <TextField
          fullWidth
          required
          name="email"
          id="email"
          label="Email"
          type={'email'}
          variant="standard"
          helperText="Ingresa tu Email"
          value={newPerson.email}
          onChange={handleInputChange}
        />

        <TextField
          fullWidth
          required
          name="name"
          id="name"
          label="Nombre"
          variant="standard"
          helperText="Ingresa tu Nombre"
          value={newPerson.name}
          onChange={handleInputChange}
        />

        <TextField
          fullWidth
          required
          name="last_name"
          id="last_name"
          label="Apellido"
          variant="standard"
          helperText="Ingresa tu Apellido"
          value={newPerson.last_name}
          onChange={handleInputChange}
        />

        <TextField
          fullWidth
          required
          name="password"
          id="password"
          label="Contraseña"
          variant="standard"
          type={"password"}
          helperText="Ingresa la contraseña que el 
                                usuario utilizará para ingresar al aplicativo"
          value={newPerson.password}
          onChange={handleInputChange}
        />

        <Button
          type="submit"
          variant="contained"
          color={"success"}
        >
          Guardar Usuario
        </Button>

      </Form>
      <AppAlert handleCloseAlert={handleCloseAlert}
        showAlert={showAlert}
        severityResponse={severityResponse}
        messageResponse={messageResponse}
      />
    </Container>

  )
}