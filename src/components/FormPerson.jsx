import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import {
    Form
} from 'react-bootstrap';
import axios from 'axios';
import { AppAlert } from "./AlertsApp";
import {
    Button, TextField
} from '@mui/material';



export default function FormPerson() {

    const [newPerson, setNewPerson] = useState({
        email: '',
        name: '',
        last_name: '',
        password: '',
        role: ''
    });

    const [severityResponse, setSeverityResponse] = useState("")
    const [messageResponse, setMessageResponse] = useState("")
    const [showAlert, setShowAlert] = useState(false)

    const handleChangeEmail = (e) => {
        setNewPerson({
            ...newPerson,
            email: e.target.value
        });
    };

    const handleChangeName = (e) => {
        setNewPerson({
            ...newPerson,
            name: e.target.value
        });
    };

    const handleChangeLastName = (e) => {
        setNewPerson({
            ...newPerson,
            last_name: e.target.value
        });
    };

    const handleChangePassword = (e) => {
        setNewPerson({
            ...newPerson,
            password: e.target.value
        });
    };

    const handleChangeRole = (e) => {
        setNewPerson({
            ...newPerson,
            role: e.target.value
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
                    handleShowAlert();
                }
            })
            .catch((error) => {
                setSeverityResponse("error")
                setMessageResponse(error.response.data.message)
                handleShowAlert();
            });
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
                    onChange={handleChangeRole}
                />

                <TextField
                    fullWidth
                    required
                    id="email"
                    label="Email"
                    variant="standard"
                    helperText="Ingresa tu Email"
                    onChange={handleChangeEmail}
                />

                <TextField
                    fullWidth
                    required
                    id="name"
                    label="Nombre"
                    variant="standard"
                    helperText="Ingresa tu Nombre"
                    onChange={handleChangeName}
                />

                <TextField
                    fullWidth
                    required
                    name="last_name"
                    id="last_name"
                    label="Apellido"
                    variant="standard"
                    helperText="Ingresa tu Apellido"
                    onChange={handleChangeLastName}
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
                    onChange={handleChangePassword}
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