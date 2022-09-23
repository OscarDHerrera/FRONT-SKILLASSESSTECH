import React from 'react';
import {
  Container,
  Grid,
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Skeleton,
  Stack,
  Chip,
  CardActionArea
} from '@mui/material'
import GetCategories from './ServiceHome'
import { Link } from 'react-router-dom'

export default function Home() {

  const MyComponent = (props) => <h2>{props.label}</h2>
  const [categories, setCategories] = React.useState([]);
  React.useEffect(() => {
    function setTimer() {
      GetCategories().then((message) => { setCategories(message) })
    }
    setTimer();
  }, []);

  return (
    <Container fixed>
      <MyComponent label="Please select category..." />
      <Box sx={{ flexGrow: 1, my:2 }}>
        <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 2, sm: 2, md: 12 }}>
          {(categories.length === 0 ? Array.from(new Array(4)) : categories).map((item, index) => (
            <Grid item key={index} xs={3} sm={4} md={4}>
              {
                item ? (
                  <CardActionArea component={Link} to='/select-items'>
                    <Card elevation={4} sx={{ backgroundColor: '#F9F9F9' }}>
                      <CardContent>
                        <Typography variant="h6" color="text.primary">
                          {item.module_name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          {item.resume_module}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Chip label="4 questions" />
                      </CardActions>
                    </Card>
                  </CardActionArea>
                ) : (
                  <Stack spacing={3}>
                    <Skeleton variant="text" width={270} sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="rectangular" width={210} height={50} />
                    <Skeleton variant="rounded" width={100} height={30} />
                  </Stack>
                )}
            </Grid>
          ))}
        </Grid>
      </Box >
    </Container>
  )
}
