import React, {useState, useEffect} from "react";
import {
    Table, Container, Modal
} from 'react-bootstrap';
import GetPerson from "../services/GetPersons";
import { DeleteAlert } from "./AlertsApp"
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button"

export default function PracTable(){
    const [persons, setPerson] = useState([]);

    const [showDelete,setShowDelete] = useState(false);

    const [deleteId, setDeleteId] = useState({
        toDeleteId:{
            value:null,
        },
    });

    useEffect(() => {
       function updateTable() {
            GetPerson().then((persons) => setPerson(persons));
        }
        updateTable();
        const refreshInterval = setInterval(() => {
            updateTable()
        }, 10000);
       return () => {
           clearInterval(refreshInterval)
        }
    },[]);

    const handleShowDelete = () => setShowDelete(true);
    const handleCloseDelete = () => setShowDelete(false);

    const showModalDelete = (id) => {
        handleShowDelete();
        setDeleteId({
            ...deleteId,
            toDeleteId: {
                value: id
            },
        });
    };

    return (
        <Container>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Genero</th>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {persons.map(({id, gender, name, age}) => (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{gender}</td>
                            <td>{name}</td>
                            <td>{age}</td>
                            <td>
                                <Stack direction={"row"} spacing={2}>
                                    <Button
                                        variant= "contained"
                                        color={"info"}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant= "contained"
                                        color={"warning"}
                                        onClick={() => showModalDelete(id)}
                                    >
                                        Eliminar
                                    </Button>
                               </Stack>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
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
                    <DeleteAlert handleCloseDelete={handleCloseDelete} toDeleteId={deleteId.toDeleteId.value} />
                </Modal.Body>
            </Modal>
        </Container>

    );
}