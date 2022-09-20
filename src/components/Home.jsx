import React from 'react';
import { Container } from '@mui/material'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import GetCategories from '../services/GetCategories'

export default function Home() {

  const [categories, setCategories] = React.useState([]);
  React.useEffect(() => {
    function setTimer() {
      GetCategories().then((message) => { setCategories(message) })
    }
    setTimer();
  }, []);

  return (
    <Container >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {categories.length === 0 ? (Array.from(new Array(6)) : []).map((item, index) => (
          <Grid key={index} item xs={4}>
            <Stack spacing={3}>
              {/* For variant="text", adjust the height via font-size */}
              <Skeleton variant="text" width={270} sx={{ fontSize: '1rem' }} />
              <Skeleton variant="rectangular" width={210} height={50} />
              <Skeleton variant="rounded" width={100} height={30} />
            </Stack>
          </Grid>
          )
          ) : (
            categories.map((module) => (
          <Grid key={module.module_id} item xs={4}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h6" color="text.primary">
                  {module.module_name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {module.resume_module}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Ingresar</Button>
              </CardActions>
            </Card>
          </Grid>
          ))
            )}
        </Grid>
      </Box>
    </Container >

  )
}
