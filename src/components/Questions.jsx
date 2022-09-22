import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Switch
} from '@mui/material'

const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: "#ff1837",
    '&:hover': {
      backgroundColor: alpha("#ff1837", theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: "#ff1837",
  },
}));

const myQuestions = [
  {
    "id": 1,
    "question": "¿Si tuvieras mucho dinero: lo ahorrarías o lo gastarías?"
  },
  {
    "id": 2,
    "question": "¿Tocas algún instrumento?"
  },
  {
    "id": 3,
    "question": "¿Te irías a vivir a otro país?"
  },
  {
    "id": 4,
    "question": "¿Qué te da más miedo: aliens o fantasmas?"
  }
]

const label = { inputProps: { 'aria-label': 'Switch demo' } };
export default function Questions() {

  return (
    <Container fixed>
      <Grid spacing={{ xs: 2, md: 2 }} columns={{ xs: 2, sm: 2, md: 12 }}>
        {
          myQuestions.map((item, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                my: 1,
                mx: 'auto',
                p: 2,
              }}
            >
              <Grid item key={index} xs={3} sm={4} md={4}>
                <Typography><GreenSwitch {...label} /> {item.question}</Typography>
              </Grid>
            </Paper>
          ))}
      </Grid>
    </Container>
  )
}
