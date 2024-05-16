import React, { useEffect, useState } from 'react'
import { Container, Box, Button, TextField, Typography, Link, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LoginImage from '../../commons/images/LoginImage.png'
import Logo from '../../commons/images/black2.ico'
import Vector1 from '../../commons/images/Vector 1.png'
import Vector2 from '../../commons/images/Vector 2.png'
import PropTypes from 'prop-types'
import { AppAlert } from '../../commons/AppAlert'
import { useNavigate } from 'react-router-dom'

export default function Login ({ setShowNav }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [severityResponse, setSeverityResponse] = React.useState('')
  const [messageResponse, setMessageResponse] = React.useState('')
  const [showAlert, setShowAlert] = React.useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleShowAlert = () => setShowAlert(true)
  const handleCloseAlert = () => setShowAlert(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email || !password) {
      setSeverityResponse('error')
      setMessageResponse('Por favor, llena todos los campos')
      handleShowAlert()
    } else {
      setSeverityResponse('success')
      setMessageResponse('Inicio de sesión exitoso')
      handleShowAlert()

      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }

  Login.propTypes = {
    setShowNav: PropTypes.func.isRequired
  }

  useEffect(() => {
    setShowNav(false)
    return () => setShowNav(true)
  }, [])

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 'calc(100vh - 100px)',
        padding: '0 10%'
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
          src={Vector1}
          alt="Vector1"
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </Box>

      <Box
        sx={{
          width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '30%' },
          height: 'auto',
          position: 'absolute',
          left: { xs: '0%', sm: '0%', md: '0%', lg: '0%', xl: '70%' },
          top: { xs: '120%', sm: '74%', md: '57%', lg: '41%', xl: '48%' },
          display: { xs: 'none', md: 'none', lg: 'none', xl: 'flex' }
        }}
      >
        <img
          src={Vector2}
          alt="Vector2"
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: { xs: '80%', md: '50%', lg: '50%', xl: '30%' },
        marginLeft: { xs: '10%', md: '25%', lg: '25%', xl: '20%' },
        marginBottom: { xs: '20px', md: '0' }
      }}
      >
        <Typography
          variant="h6"
          component="h1"
          gutterBottom
          sx={{
            padding: '0 10px',
            textAlign: 'center'
          }}
        >

          <img
            src={Logo}
            alt="Vector3"
            style={{
              width: '10%',
              height: '10%',
              position: 'relative',
              top: '-1px',
              left: '-5px'
            }}
          />

          SKILLASSESSTECH
        </Typography>

        <TextField
          label="Ingresa tu Email"
          fullWidth
          sx={{ mb: 2 }}
          variant="standard"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Ingresa tu Contraseña"
          type={showPassword ? 'text' : 'password'}
          sx={{ mb: 2 }}
          variant="standard"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <Typography
          component={'a'}
          variant="body2"
          sx={{ mb: 2 }}
          href="/login"
          id='forgot'
          align="right"
        >
          ¿Olvidaste tu contraseña?
        </Typography>

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            borderRadius: '50px',
            bgcolor: '#083cbc',
            ':hover': {
              backgroundColor: '#000000',
              color: '#ffffff'
            }
          }}
        >
          Iniciar Sesión
        </Button>
        <Typography
          variant="body2"
          sx={{ mt: 2 }}
          align="center"
        >
          ¿No tienes cuenta?
          <Link href="/register" id='register'>
            Registrate
          </Link>
        </Typography>

      </Box>
      <Box
        sx={{
          width: { xs: '0%', md: '0%', lg: '0%', xl: '50%' },
          alignItems: 'center',
          justifyContent: 'center',
          display: { xs: 'none', md: 'none', lg: 'none', xl: 'flex' }
        }}
      >
        <img src={LoginImage} alt="Login" />
      </Box>
      <AppAlert handleCloseAlert={handleCloseAlert}
        showAlert={showAlert}
        severityResponse={severityResponse}
        messageResponse={messageResponse}
      />
    </Container>
  )
};
