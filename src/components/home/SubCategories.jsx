import React from "react"
import { useParams } from "react-router-dom"
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
  CardActionArea
} from '@mui/material'
import { Link } from 'react-router-dom'
import { GetSubCategories } from './service/ServiceHome'


export default function SubCategories() {

  const [subcategories, setSubcategories] = React.useState([])
  const MyComponent = (props) => <h2>{props.label}</h2>
  let module_name = useParams()

  React.useEffect(() => {
    setTimeout(() => {
      GetSubCategories().then((subcategories) => { setSubcategories(subcategories) })
    }, 2000);
  }, []);

  return (
    <Container fixed>
      <MyComponent label="Please select SubCategorie..." />
      <Box sx={{ flexGrow: 1, my: 2 }}>
        <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 2, sm: 2, md: 12 }}>
          {(subcategories.length === 0 ? Array.from(new Array(6)) : subcategories).map((item, index) => (
            <Grid item key={index} xs={3} sm={4} md={4}>
              {
                item ? (
                  <CardActionArea component={Link} to={{
                    pathname: `/subcategories/questions/${item.questions_link}`
                  }} >
                    <Card elevation={4} sx={{ backgroundColor: '#F9F9F9' }}>
                      <CardContent>
                        <Typography variant="h6" color="text.primary">
                          {item.id}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          {item.subcategorie}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Chip label={`${item.subcategorie.length} questions`} />
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

