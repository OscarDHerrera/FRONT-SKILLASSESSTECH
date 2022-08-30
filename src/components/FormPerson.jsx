import React, {useState} from 'react';
import { Container } from 'react-bootstrap';
import {
    Form
} from 'react-bootstrap';
import axios from 'axios';
import {CreateAlert} from "./AlertsApp";
// import { useNavigate } from 'react-router-dom';
import {
    MenuItem,FormControl,Select,Button,FormHelperText,InputLabel,TextField
} from '@mui/material';



export default function FormPerson(){

    // const navigate = useNavigate();

    const [newPerson, setNewPerson] = useState({
        gender: 'None',
        name:'',
        age:'',
    });

    const [showCreateAlert, setShowCreateAlert] = useState(false)

    const handleChangeGender = (e) => {
        setNewPerson({
            ...newPerson,
            gender: e.target.value
        });
    };

    const handleChangeName = (e) => {
        setNewPerson({
            ...newPerson,
            name: e.target.value
        });
    };

    const handleChangeAge = (e) => {
        setNewPerson({
            ...newPerson,
            age: e.target.value
        });
    };

    const handleShowCreate = () => setShowCreateAlert(true);
    const handleCloseCreate = () => setShowCreateAlert(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://127.0.0.1:8000/fast-practice/create_person",newPerson
            ).then((res) => {
                const responseStatus = res.status
                    if (responseStatus === 201){
                        handleShowCreate();
                    }
            })
            // navigate('/person-table')
            .catch((error) => {
                console.log(error)
            });
    }

    return(
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormControl  required fullWidth variant={"standard"}>
                    <InputLabel id={"gender"}>Género</InputLabel>
                    <Select
                        name={"gender"}
                        id={"gender"}
                        value={ newPerson.gender.value }
                        label={"gender"}
                        onChange={handleChangeGender}
                        defaultValue = ""
                    >
                        <MenuItem value=""><em>Ninguno</em></MenuItem>
                        <MenuItem value="Masculino">Masculino</MenuItem>
                        <MenuItem value="Femenino">Femenino</MenuItem>
                        <MenuItem value="Otro">Otro</MenuItem>
                    </Select>
                    <FormHelperText>Selecciona un Género</FormHelperText>
                </FormControl>
                <TextField
                    fullWidth
                    required
                    id="Name"
                    label="Nombre"
                    variant="standard"
                    helperText="Ingresa tu Nombre"
                    onChange={handleChangeName}
                />
                <TextField
                    fullWidth
                    required
                    id="Age"
                    label="Age"
                    variant="standard"
                    helperText="Ingresa tu Edad"
                    onChange={handleChangeAge}
                />
                <Button
                    type="submit"
                    variant= "contained"
                    color={"success"}
                >
                    Guardar persona
                </Button>
            </Form>
            <CreateAlert handleCloseCreate={handleCloseCreate} showCreateAlert={showCreateAlert} />
        </Container>

    )}