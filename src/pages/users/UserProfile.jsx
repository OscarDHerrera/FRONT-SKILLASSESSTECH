import React, { useState } from 'react'
import { Container, Box, TextField, Grid, Avatar, IconButton, RadioGroup, FormControlLabel, Radio, FormLabel, Button } from '@mui/material'
import Vector5 from '../../commons/images/Vector 5.png'

export default function UserProfile () {
  const [fullName, setFullName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [department, setDepartment] = useState('')
  const [position, setPosition] = useState('')
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState('')
  const [profileImage, setProfileImage] = useState('')

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target.result)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleInputChange = (e, setState) => {
    setState(e.target.value)
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 100px)'
      }}
    >

      <Box
        sx={{
          width: { xs: '12%', sm: '14%', md: '16%', lg: '18%', xl: '60%' },
          height: 'auto',
          position: 'absolute',
          left: { xs: '0%', sm: '0%', md: '0%', lg: '0%', xl: '20%' },
          top: { xs: '0%', sm: '0%', md: '0%', lg: '0%', xl: '8%' }
        }}
      >
        <img
          src={Vector5}
          alt="Vector5"
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </Box>

      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '1em',
          width: '100%'
        }}
      >
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="profile-image-upload"
          type="file"
          onChange={handleProfileImageChange}
        />
        <Box
          sx={{
            position: 'relative',
            right: { xs: '0%', sm: '14%', md: '16%', lg: '18%', xl: '0%' },
            transform: 'translate(-50%)',
            top: { xs: '0%', sm: '14%', md: '16%', lg: '18%', xl: '-14%' }
          }}
        >
          <label htmlFor="profile-image-upload">
            <IconButton component="span">
              <Avatar src={profileImage} alt="Profile" sx={{ width: 150, height: 150 }} />
            </IconButton>
          </label>
        </Box>
      </Box>

      <Box
        name="user-profile-form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2%',
          position: 'relative'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ marginBottom: '1em', width: '100%' }}>
              <TextField
                label="Nombre completo"
                value={fullName}
                onChange={(e) => handleInputChange(e, setFullName)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 7,
                    '& fieldset': {
                      borderColor: '#083cbc'
                    }
                  }
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ marginBottom: '1em', width: '100%' }}>
              <TextField
                label="Apellido(s)"
                value={fullName}
                onChange={(e) => handleInputChange(e, setFullName)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 7,
                    '& fieldset': {
                      borderColor: '#083cbc'
                    }
                  }
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ marginBottom: '1em', width: '100%' }}>
              <TextField
                label="Fecha de nacimiento"
                value={birthdate}
                onChange={(e) => handleInputChange(e, setBirthdate)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 7,
                    '& fieldset': {
                      borderColor: '#083cbc'
                    }
                  }
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ marginBottom: '1em', width: '100%' }}>
              <TextField
                label="Departamento"
                value={department}
                onChange={(e) => handleInputChange(e, setDepartment)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 7,
                    '& fieldset': {
                      borderColor: '#083cbc'
                    }
                  }
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ marginBottom: '1em', width: '100%' }}>
              <TextField
                label="Cargo"
                value={position}
                onChange={(e) => handleInputChange(e, setPosition)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 7,
                    '& fieldset': {
                      borderColor: '#083cbc'
                    }
                  }
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ marginBottom: '1em', width: '100%' }}>
              <FormLabel component="legend">Género</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={(e) => handleInputChange(e, setGender)}
              >
                <FormControlLabel value="female" control={<Radio />} label="Femenino" />
                <FormControlLabel value="male" control={<Radio />} label="Masculino" />
              </RadioGroup>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ marginBottom: '1em', width: { xl: '100%' } }}>
              <TextField
                label="Correo electrónico"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 7,
                    '& fieldset': {
                      borderColor: '#083cbc'
                    }
                  }
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={1} sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
        <Grid item xs={12}>
          <Button
            type="reset"
            variant="contained"
            sx={{
              borderRadius: '50px',
              mr: 2,
              backgroundColor: '#083cbc',
              color: '#ffffff',
              ':hover': {
                backgroundColor: '#000000',
                color: '#ffffff'
              }
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: '50px',
              backgroundColor: '#083cbc',
              color: '#ffffff',
              ':hover': {
                backgroundColor: '#000000',
                color: '#ffffff'
              }
            }}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>

    </Container>
  )
}
