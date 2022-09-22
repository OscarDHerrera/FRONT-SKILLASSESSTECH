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
      {
        myQuestions.map((item, index) => (
          <Paper
            key={index}
            sx={{
              my: 1,
              mx: 'auto',
              p: 2,
            }}
          >
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
              <GreenSwitch {...label} defaultChecked />
              </Grid>
              <Grid item xs>
                <Typography noWrap>{item.question}</Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}
    </Container>
  )
}
