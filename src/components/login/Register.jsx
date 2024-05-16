import React, { useEffect } from 'react'
import axios from 'axios'
import {
  Form
} from 'react-bootstrap'

import {
  Button,
  TextField,
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  InputAdornment,
  IconButton
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
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
  }, [])

  const [newPerson, setNewPerson] = React.useState({
    name: '',
    last_name: '',
    id_number: '',
    date_of_born: '',
    email: '',
    telephone: '',
    password: ''
  })

  const [severityResponse, setSeverityResponse] = React.useState('')
  const [messageResponse, setMessageResponse] = React.useState('')
  const [showAlert, setShowAlert] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewPerson({
      ...newPerson,
      [name]: value
    })
  }

  const handleShowAlert = () => setShowAlert(true)
  const handleCloseAlert = () => setShowAlert(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('http://10.40.100.57:8000/user/create_user', newPerson
      ).then((res) => {
        const responseStatus = res
        if (responseStatus.status === 201) {
          setSeverityResponse('success')
          setMessageResponse(responseStatus.data.message)
          setNewPerson({
            ...newPerson,
            name: '',
            last_name: '',
            id_number: '',
            date_of_born: '',
            email: '',
            telephone: '',
            password: ''
          })
          handleShowAlert()
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setSeverityResponse('info')
          setMessageResponse(error.response.data.message)
          handleShowAlert()
        } else if (error.response.status === 422) {
          setSeverityResponse('info')
          setMessageResponse(error.response.data.detail[0].msg)
          handleShowAlert()
        } else {
          setSeverityResponse('error')
          setMessageResponse(error.message)
          handleShowAlert()
        }
      }
      )
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
        width: '100%'
      }}
    >

        <Box
          sx={{
            width: { xs: '12%', sm: '14%', md: '16%', lg: '18%', xl: '20%' },
            height: 'auto',
            position: 'absolute',
            left: { xs: '0%', sm: '0%', md: '0%', lg: '0%', xl: '0%' },
            top: { xs: '0%', sm: '0%', md: '0%', lg: '0%', xl: '0%' },
            display: { xs: 'none', md: 'none', lg: 'none', xl: 'flex' }
          }}
        >
          <img
            src={Vector3}
            alt="Vector3"
            style={{
              width: '100%',
              height: '100%'
            }}
          />
        </Box>
        <Box
          sx={{
            width: { xs: '70%', sm: '60%', md: '50%', lg: '40%', xl: '30%' },
            height: 'auto',
            position: 'absolute',
            left: { xs: '-7%', sm: '-2%', md: '2%', lg: '4%', xl: '17%' },
            top: { xs: '-2%', sm: '-4%', md: '4%', lg: '4%', xl: '4%' }
          }}
        >
          <img
            src={RegisterImage}
            alt="RegisterImage"
            style={{
              width: '100%',
              height: '100%'
            }}
          />
        </Box>

        <Box
          sx={{
            width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%' },
            height: 'auto',
            position: 'absolute',
            left: { xs: '0%', sm: '0%', md: '0%', lg: '0%', xl: '0%' },
            top: { xs: '120%', sm: '74%', md: '55%', lg: '44%', xl: '18%' },
            display: { xs: 'none', md: 'none', lg: 'none', xl: 'flex' }
          }}
        >
          <img
            src={Vector4}
            alt="Vector4"
            style={{
              width: '100%',
              height: '100%'
            }}
          />
        </Box>

        <Box
          name= "SubContainer"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: { xs: '90%', sm: '70%', md: '70%', lg: '70%', xl: '50%' },
            height: { xs: '90%', sm: '90%', md: '70%', lg: '70%', xl: '70%' },
            padding: '2%',
            position: 'relative'
          }}
        >

          <Typography
              variant="h6"
              component="h1"
              gutterBottom
              sx={{
                border: '1px solid #000',
                borderRadius: '20px',
                position: 'absolute',
                top: { xs: '-10px', sm: '-4px', md: '5px', lg: '10px', xl: '20px' },
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#fff',
                padding: '0 10px'
              }}
            >

              <img
                src={Logo}
                alt="Vector3"
                style={{
                  width: '20px',
                  height: '20px',
                  position: 'relative',
                  top: '-1px',
                  left: '-5px'
                }}
              />

              SAT
            </Typography>

          <Box
            name= "FormContainer"
            sx={{
              border: '1px solid #000',
              borderRadius: '20px',
              padding: '5px',
              backgroundColor: '#fff',
              width: '100%',
              height: '100%'
            }}
          >

            <Typography variant="h6" component="h1" gutterBottom sx={{ mt: 4, textAlign: 'center' }}>
                  Formulario de Registro
            </Typography>

            <Paper sx={{
              padding: 2,
              backgroundColor: '#fff',
              border: '1px solid #000',
              borderRadius: '20px',
              width: 'fit-content',
              m: 2
            }}
            >
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      name="name"
                      id="name"
                      label="Nombre(s)"
                      variant="outlined"
                      value={newPerson.name}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      name="last_name"
                      id="last_name"
                      label="Apellido(s)"
                      variant="outlined"
                      value={newPerson.last_name}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      name="id_number"
                      id="id_number"
                      label="N° de Identificación"
                      variant="outlined"
                      value={newPerson.id_number}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      name="date_of_born"
                      id="date_of_born"
                      type='date'
                      variant="outlined"
                      value={newPerson.date_of_born}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      name="email"
                      id="email"
                      type='email'
                      label="Correo Electronico"
                      variant="outlined"
                      value={newPerson.email}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      name="telephone"
                      id="telephone"
                      label="Telefono"
                      variant="outlined"
                      value={newPerson.telephone}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Typography>
                      Hoja de Vida
                    </Typography>

                    <TextField
                      required
                      name="cv"
                      id="cv"
                      type='file'
                      variant="outlined"
                      value={newPerson.cv}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      name="password"
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      label="Contraseña"
                      variant="outlined"
                      value={newPerson.password}
                      onChange={handleInputChange}
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

                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      name="confirm_password"
                      id="confirm_password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      label="Confirmar Contraseña"
                      variant="outlined"
                      value={newPerson.confirm_password}
                      onChange={handleInputChange}
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

        <Grid container spacing={1} sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
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
              href='/login'
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
