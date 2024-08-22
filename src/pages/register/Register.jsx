import React, { useEffect } from 'react'
import {
  Form
} from 'react-bootstrap'
import { submitRegisterForm } from './service/ServiceRegister'
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  Button,
  IconButton,
  InputAdornment,
  InputLabel
} from '@mui/material'
import dayjs from 'dayjs'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { AppAlert } from '../../commons/AppAlert'
import RegisterImage from '../../commons/images/RegisterImage.png'
import Vector3 from '../../commons/images/Vector 3.png'
import Vector4 from '../../commons/images/Vector 4.png'
import Logo from '../../commons/images/black2.ico'
import PropTypes from 'prop-types'

export default function FormPerson ({ setShowNav }) {
  FormPerson.propTypes = {
    setShowNav: PropTypes.func.isRequired
  }

  useEffect(() => {
    setShowNav(false)
    return () => setShowNav(true)
  }, [setShowNav])

  const [newPerson, setNewPerson] = React.useState({
    name: '',
    last_name: '',
    document: '',
    born_date: dayjs(),
    email: '',
    phone_number: '',
    address: '',
    gender: '',
    password: '',
    confirm_password: ''
  })

  const [severityResponse, setSeverityResponse] = React.useState('')
  const [messageResponse, setMessageResponse] = React.useState('')
  const [showAlert, setShowAlert] = React.useState(false)
  const [errors, setErrors] = React.useState({})
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewPerson({
      ...newPerson,
      [name]: value
    })
  }

  const handleDateChange = (date) => {
    setNewPerson({
      ...newPerson,
      born_date: date
    })
  }

  const handleResetForm = () => {
    setNewPerson({
      name: '',
      last_name: '',
      document: '',
      born_date: dayjs(),
      email: '',
      phone_number: '',
      address: '',
      gender: '',
      password: '',
      confirm_password: ''
    })
  }

  const handleShowAlert = () => setShowAlert(true)
  const handleCloseAlert = () => setShowAlert(false)

  const calculateAge = (bornDate) => {
    const today = dayjs()
    return today.diff(bornDate, 'year')
  }

  const validateForm = (newPerson) => {
    const errors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Validación de campos numéricos
    if (isNaN(newPerson.document)) errors.document = 'El documento debe contener solo números'
    if (isNaN(newPerson.phone_number)) errors.phone_number = 'El teléfono debe contener solo números'
    if (newPerson.document.length < 6) errors.document = 'El documento debe tener por lo menos 6 dígitos'
    if (newPerson.phone_number.length !== 10) errors.phone_number = 'El teléfono debe tener 10 dígitos'

    // Validación de correo electrónico
    if (!emailRegex.test(newPerson.email)) errors.email = 'El correo electrónico no es válido'

    // Validación de contraseña
    if (newPerson.password !== newPerson.confirm_password) errors.confirm_password = 'Las contraseñas no coinciden'
    if (newPerson.password.length < 8) errors.password = 'La contraseña debe tener al menos 8 caracteres'
    if (!/[A-Z]/.test(newPerson.password)) errors.password = 'La contraseña debe contener al menos una letra mayúscula'
    if (!/[a-z]/.test(newPerson.password)) errors.password = 'La contraseña debe contener al menos una letra minúscula'
    if (!/[0-9]/.test(newPerson.password)) errors.password = 'La contraseña debe contener al menos un número'
    if (!/[!@#$%^&*]/.test(newPerson.password)) errors.password = 'La contraseña debe contener al menos un caracter especial'

    // Validación de fecha de nacimiento
    if (calculateAge(newPerson.born_date) < 18) errors.born_date = 'Debes ser mayor de edad para registrarte'

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const emptyFields = Object.keys(newPerson).filter(field => field !== 'born_date' && !newPerson[field].trim())

    // Filtrar campos vacíos
    if (emptyFields.length > 0) {
      setSeverityResponse('error')
      setMessageResponse('Hay campos requeridos vacíos')
      const newErrors = {}
      emptyFields.forEach(field => {
        newErrors[field] = 'Campo requerido'
      })
      setErrors(newErrors)
      handleShowAlert()
      return
    }

    setErrors({})

    // Validar valores del formulario
    const validationErrors = validateForm(newPerson)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSeverityResponse('error')
      setMessageResponse('Hay errores en el formulario')
      handleShowAlert()
      return
    }

    const response = await submitRegisterForm(newPerson)

    if (response.success) {
      handleResetForm()
      setSeverityResponse('success')
      setMessageResponse('Registro exitoso')
    } else {
      setSeverityResponse('error')
      setMessageResponse(response.error)
    }
    handleShowAlert()
  }

  return (
    <Container
      name= "MainContainer"
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 100px)',
        padding: '0 10%',
        background: '#083cbc',
        width: '100%',
        position: 'relative'
      }}
    >

        <Box
          sx={{
            width: '20%',
            height: 'auto',
            position: 'absolute',
            left: '0%',
            top: '0%',
            display: 'flex',
            zIndex: 1
          }}
        >
          <img
            src={Vector3}
            alt="Vector3"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </Box>
        <Box
          sx={{
            width: { xs: '60%', sm: '50%', md: '40%', lg: '30%', xl: '20%' },
            height: 'auto',
            position: 'absolute',
            left: { xs: '5%', sm: '5%', md: '10%', lg: '15%', xl: '20%' },
            top: { xs: '10%', sm: '10%', md: '15%', lg: '20%', xl: '25%' },
            display: { xs: 'None', sm: 'None', md: 'None', lg: 'flex', xl: 'flex' },
            zIndex: 1
          }}
        >
          <img
            src={RegisterImage}
            alt="RegisterImage"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </Box>

        <Box
          sx={{
            width: '100%',
            height: 'auto',
            position: 'absolute',
            right: '0%',
            bottom: '0%',
            display: 'flex',
            zIndex: 1
          }}
        >
          <img
            src={Vector4}
            alt="Vector4"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </Box>

        <Box
          name= "SubContainer"
          align="center"
          sx={{
            width: { xs: '100%', sm: '80%', md: '70%', lg: '60%', xl: '50%' },
            height: 'auto',
            padding: '2%',
            position: 'relative',
            zIndex: 2
          }}
        >
            <Typography
              variant="h6"
              component="h1"
              sx={{
                border: '1px solid #000',
                borderRadius: '20px',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
                background: '#fff',
                padding: '0 10px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <img
                src={Logo}
                alt="Vector3"
                style={{
                  width: '20px',
                  height: '20px',
                  marginRight: '5px'
                }}
              />
              SAT
            </Typography>

          <Box
            name= "FormContainer"
            sx={{
              border: '1px solid #000',
              borderRadius: '20px',
              backgroundColor: '#fff',
              width: '100%'
            }}
          >

            <Typography variant="h6" component="h1" gutterBottom sx={{ mt: 4, textAlign: 'center' }}>
                  Formulario de Registro
            </Typography>

            <Paper
              sx={{
                padding: 2,
                border: '1px solid #000',
                borderRadius: '20px',
                m: 2
              }}
            >
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="name"
                      id="name"
                      label="Nombre(s)"
                      variant="outlined"
                      value={newPerson.name}
                      onChange={handleInputChange}
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="last_name"
                      id="last_name"
                      label="Apellido(s)"
                      variant="outlined"
                      value={newPerson.last_name}
                      onChange={handleInputChange}
                      error={!!errors.last_name}
                      helperText={errors.last_name}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="document"
                      label="N° de Identificación"
                      variant="outlined"
                      value={newPerson.document}
                      onChange={handleInputChange}
                      error={!!errors.document}
                      helperText={errors.document}
                    />
                  </Grid>

                  <Grid item xs={6}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Fecha de Nacimiento"
                        name="born_date"
                        value={newPerson.born_date}
                        onChange={handleDateChange}
                        views={['year', 'month', 'day']}
                        slotProps={{
                          textField: {
                            variant: 'outlined',
                            error: !!errors.born_date,
                            helperText: errors.born_date
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="email"
                      type='email'
                      label="Correo Electronico"
                      variant="outlined"
                      value={newPerson.email}
                      onChange={handleInputChange}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="phone_number"
                      label="Telefono"
                      variant="outlined"
                      type='number'
                      value={newPerson.phone_number}
                      onChange={handleInputChange}
                      error={!!errors.phone_number}
                      helperText={errors.phone_number}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="address"
                      label="Dirección"
                      variant="outlined"
                      value={newPerson.address}
                      onChange={handleInputChange}
                      error={!!errors.address}
                      helperText={errors.address}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors.gender} >
                      <InputLabel>Genero</InputLabel>
                      <Select
                        name='gender'
                        label="gender"
                        value={newPerson.gender}
                        onChange={handleInputChange}
                      >
                        <MenuItem value='M'>Masculino</MenuItem>
                        <MenuItem value='F'>Femenino</MenuItem>
                      </Select>
                      <FormHelperText>{errors.gender}</FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      label="Contraseña"
                      variant="outlined"
                      value={newPerson.password}
                      onChange={handleInputChange}
                      error={!!errors.password}
                      helperText={errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              onMouseDown={(event) => event.preventDefault()}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="confirm_password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      label="Confirmar Contraseña"
                      variant="outlined"
                      value={newPerson.confirm_password}
                      onChange={handleInputChange}
                      error={!!errors.confirm_password}
                      helperText={errors.confirm_password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              onMouseDown={(event) => event.preventDefault()}
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>

                </Grid>
              </Form>
            </Paper>
          </Box>
        </Box>

        <Grid container spacing={1} sx={{ mt: 2, mb: 2, textAlign: 'center', zIndex: 2 }}>
          <Grid item xs={12}>
            <Button
              type="reset"
              variant="contained"
              sx={{
                borderRadius: '50px',
                mr: 2,
                backgroundColor: '#ffffff',
                color: '#000000',
                ':hover': {
                  backgroundColor: '#000000',
                  color: '#ffffff'
                }
              }}
              href='/login'
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: '50px',
                backgroundColor: '#ffffff',
                color: '#000000',
                ':hover': {
                  backgroundColor: '#000000',
                  color: '#ffffff'
                }
              }}
              onClick={handleSubmit}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      <AppAlert handleCloseAlert={handleCloseAlert}
        showAlert={showAlert}
        severityResponse={severityResponse}
        messageResponse={messageResponse}
      />
    </Container>

  )
}
