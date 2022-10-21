import {
  Container,
  Box
} from '@mui/material'

export default function Footer() {
  return (
    <Box sx={{
      color: 'white',
      height: '250px',
      bgcolor: 'black',
      position: 'relative',
      bottom: 0,
      width: '100%',
      left: 0,
      right: 0
    }} >
      <p style={{ color: 'white' }}>Hola</p>
    </Box>
  )
}