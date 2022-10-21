import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Switch,
  Skeleton
} from '@mui/material'

import { GetQuestions } from './service/ServiceHome'

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


const label = { inputProps: { 'aria-label': 'Switch demo' } };
export default function Questions() {

  const [questions, setQuestions] = React.useState([])

  React.useEffect(() => {
    setTimeout(() => {
      GetQuestions().then((questions) => { setQuestions(questions) })
    }, 2000);
  }, [])

  return (
    <Container fixed>
      <Grid sx={{ xs: 2, md: 2 }} columns={{ xs: 2, sm: 2, md: 12 }}>
        {(questions.length === 0 ? Array.from(new Array(6)) : questions).map((item, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              my: 2.7,
              mx: 'auto',
              p: 2,
              bgcolor: '#F9F9F9'
            }}
          >
            {item ? (
              <Grid item key={index} xs={3} sm={4} md={4}>
                <Typography>
                  <GreenSwitch {...label} />
                  {item.question}
                </Typography>
              </Grid>
            ) : (
              <Grid item key={index} xs={3} sm={4} md={4}>
                <Typography>
                  <Skeleton animation="wave" />
                </Typography>
              </Grid>
            )
            }
          </Paper>
        ))}
      </Grid>
    </Container>
  )
}
