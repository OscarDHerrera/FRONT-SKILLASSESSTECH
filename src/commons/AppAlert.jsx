import * as React from 'react'
import {
  Snackbar
} from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import PropTypes from 'prop-types'

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function AppAlert ({ showAlert, handleCloseAlert, severityResponse, messageResponse, colorMessage }) {
  AppAlert.propTypes = {
    showAlert: PropTypes.bool,
    handleCloseAlert: PropTypes.func,
    severityResponse: PropTypes.string,
    messageResponse: PropTypes.string,
    colorMessage: PropTypes.string
  }

  return (
    <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
      {
        severityResponse === 'error'
          ? (
          <Alert onClose={handleCloseAlert} severity={`${severityResponse}`} sx={{ width: '100%', bgcolor: '#ff1837' }}>
            {messageResponse}
          </Alert>
            )
          : severityResponse === 'success'
            ? (
            <Alert onClose={handleCloseAlert} severity={`${severityResponse}`} sx={{ width: '100%' }}>
              {messageResponse}
            </Alert>
              )
            : (
            <Alert onClose={handleCloseAlert} severity={`${severityResponse}`} sx={{ width: '100%' }}>
              {messageResponse}
            </Alert>
              )
      }
    </Snackbar>
  )
}
