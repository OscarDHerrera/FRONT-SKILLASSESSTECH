import * as React from 'react';
import {
    Form
} from "react-bootstrap";
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export function DeleteAlert({ handleCloseDelete, delete_id }){

    const usersToDelete = {delete_id}
 
    const deletePerson = () => {
        console.log(usersToDelete)
        axios
            .post(`http://10.40.100.57:8000/user/delete-user`, usersToDelete)
            .then((response)=>{
                console.log(response)
            })
        handleCloseDelete();
    };

    return (
    <Form> {/*onSubmit={() => deletePerson(toDeleteId)*/}
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
        <Stack direction={"row"} spacing={2}>
            <Button
            onClick={handleCloseDelete}
            variant= "contained"
            color={"success"}
            >
                Cancelar
            </Button>
            <Button
            onClick={() => deletePerson()}
            variant= "contained"
            color={"warning"}
            >
                Aceptar
            </Button>
        </Stack>
    </Form>
    );
}


// export function CreateAlert ({ showCreateAlert,handleCloseCreate }){
//
//     return(
//         <Alert show={showCreateAlert}  variant="success">
//             <Alert.Heading> Creación Completa </Alert.Heading>
//             <p>
//                 La creación del usuario se ha realizado correctamente
//             </p>
//             <div>
//                 <Button
//                 onClick={handleCloseCreate}
//                 >
//                     Cerrar
//                 </Button>
//             </div>
//         </Alert>
//     );
// }


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function CreateAlert ({showCreateAlert, handleCloseCreate, severityResponse, messageResponse}){
    return (
        <Snackbar open={showCreateAlert} autoHideDuration={6000} onClose={handleCloseCreate}>
            <Alert onClose={handleCloseCreate} severity={`${severityResponse}`} sx={{ width: '100%' }}>
                {messageResponse}
            </Alert>
        </Snackbar>
    )
}