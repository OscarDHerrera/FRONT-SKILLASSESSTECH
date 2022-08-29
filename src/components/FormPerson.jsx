import React, {useState} from 'react';
import { Container } from 'react-bootstrap';
import {
    Form,Row,Button
} from 'react-bootstrap';
import axios from 'axios';
import {CreateAlert} from "./AlertsApp";
// import { useNavigate } from 'react-router-dom';



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
                <Form.Group as={Row} className="mb-1">
                    <Form.Label htmlFor="gender" column> Genero
                        <Form.Select name="gender" id="gender" value={newPerson.gender.value} onChange={handleChangeGender}>
                            <option value="None">Selecciona un Genero</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                        </Form.Select>
                    </Form.Label>
                </Form.Group>
                <Form.Group as={Row} className="mb-1">
                    <Form.Label htmlFor="name" column> Nombre
                        <Form.Control
                            name = "name"
                            id="name"
                            type='text'
                            placeholder='Ingresa tu Nombre'
                            onChange={handleChangeName}
                            required
                        />
                    </Form.Label>
                </Form.Group>
                <Form.Group as={Row} className="mb-1">
                    <Form.Label htmlFor="age" column> Edad
                        <Form.Control
                            name = "age"
                            id="age"
                            type='text'
                            placeholder='Ingresa tu edad'
                            onChange={handleChangeAge}
                            required
                        />
                    </Form.Label>
                </Form.Group>
                <Button
                    variant="outline-info"
                    type="submit"
                >
                    Guardar persona
                </Button>
            </Form>
            <CreateAlert handleCloseCreate={handleCloseCreate} showCreateAlert={showCreateAlert} />
        </Container>

    )}