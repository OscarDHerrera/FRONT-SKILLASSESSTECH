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
import Checkbox from '@mui/material/Checkbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';



export default function Favorites() {

  const [subcategories, setSubcategories] = React.useState([])
  const MyComponent = (props) => <h2>{props.label}</h2>
  let module_name = useParams()
  let vacants={
    data: {
      name:  "XYZ Tech Solutions",
      description: "XYZ Tech Solutions, una empresa líder en innovación tecnológica, \
                    está en busca de un Desarrollador de Software Senior altamente \
                    capacitado para unirse a nuestro talentoso equipo en la sede de Ciudad ABC"
    }
  }
  React.useEffect(() => {
    setTimeout(() => {
      GetSubCategories().then((subcategories) => { setSubcategories(subcategories) })
    }, 2000);
  }, []);

  return (
    <Container fixed>
      <MyComponent label="Elige tu destino" />
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
                    <div>
                      <Checkbox
                        sx={{ position: 'absolute', top: 0, right: 0, margin: '8px'}} 
                        icon={<BookmarkBorderIcon />}
                        checkedIcon={<BookmarkIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      />
                    </div>
                      <CardContent>
                        <Typography variant="h6" color="text.primary">
                          {vacants.data.name}
                          {/* {item.id} */}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          {vacants.data.description}
                          {/* {item.subcategorie} */}
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

