import * as React from 'react';
import {
    Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

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