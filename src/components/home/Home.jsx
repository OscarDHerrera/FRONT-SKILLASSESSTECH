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
  Chip,
  CardActionArea,
  Divider
} from '@mui/material'
import { GetCategories } from './service/ServiceHome'
import { Link } from 'react-router-dom'

export default function Home() {

  const MyComponent = (props) => <h2>{props.label}</h2>
  const [categories, setCategories] = React.useState([]);

  React.useEffect(
    () => {
      setTimeout(() => {
        GetCategories().then((categories) => { setCategories(categories) })
      }, 2000);
    }, []);

  return (
    <Container fixed>
      <MyComponent label="Please select category..." />
      <Box sx={{ flexGrow: 1, my: 2 }}>
        <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 2, sm: 2, md: 12 }}>
          {(categories.length === 0 ? Array.from(new Array(6)) : categories).map((item, index) => (
            <Grid item key={index} xs={3} sm={4} md={4}>
              {
                item ? (
                  <CardActionArea component={Link} to={{
                    pathname: `/subcategories/${item.module_link}`
                  }} >
                    <Card elevation={4} sx={{ backgroundColor: '#F9F9F9' }}>
                      <CardContent>
                        <Typography
                          variant="h6"
                          color="text.primary">
                          {item.module_name}
                        </Typography>
                        <Divider sx={{ bgcolor: 'black' }} />
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div">
                          {item.resume_module}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Chip label={"4 subcategories"} />
                      </CardActions>
                    </Card>
                  </CardActionArea>
                ) : (
                  <Card elevation={4} sx={{ backgroundColor: '#F9F9F9' }}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        color="text.primary">
                        <Skeleton animation="wave" />
                      </Typography>
                      <Typography
                        variant="h2">
                        <Skeleton
                          animation="wave" />
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Skeleton
                        variant={'rounded'}
                        animation="wave"
                        width={'20%'}
                        height={'30px'} />
                    </CardActions>
                  </Card>
                )}
            </Grid>
          ))}
        </Grid>
      </Box >
    </Container>
  )
}