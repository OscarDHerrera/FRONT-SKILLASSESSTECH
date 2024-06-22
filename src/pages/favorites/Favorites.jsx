import React from 'react'
import { Link } from 'react-router-dom'
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

import { GetSubCategories } from '../home/service/ServiceHome'
import Checkbox from '@mui/material/Checkbox'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import PropTypes from 'prop-types'

export default function Favorites () {
  const [subcategories, setSubcategories] = React.useState([])
  const MyComponent = (props) => <h2>{props.label}</h2>

  MyComponent.propTypes = {
    label: PropTypes.string.isRequired
  }

  const vacants = {
    data: {
      name: 'Lorem Ipsum',
      description: 'consectetur adipiscing elit. Donec id tortor at ex faucibus porta. Donec blandit mattis libero, et tempus nisl rhoncus sit amet. Maecenas vitae imperdiet quam, dapibus ultrices est. Etiam ut enim sagittis, rhoncus eros sed, scelerisque libero. Phasellus in dictum elit. Phasellus sit amet magna fermentum, lacinia ante eu, pulvinar ex. Cras venenatis sit amet nunc quis consequat. Nullam porttitor elit id felis fermentum consequat ac sit amet orci. Nunc a blandit sapien.'
    }
  }
  // const [isChecked, setIsChecked] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      GetSubCategories().then((subcategories) => { setSubcategories(subcategories) })
    }, 2000)
  }, [])

  const [isCheckedArray, setIsCheckedArray] = React.useState(
    new Array(subcategories.length).fill(false)
  )

  return (
    <Container fixed>
      <MyComponent label="Explora tus elecciones favoritas" />
      <Box sx={{ flexGrow: 1, my: 2 }}>
        <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 2, sm: 2, md: 12 }}>
          {(subcategories.length === 0 ? Array.from(new Array(6)) : subcategories).map((item, index) => (
            <Grid item key={index} xs={3} sm={4} md={4}>
              {
                item
                  ? (
                    <CardActionArea component={Link} to={{
                      pathname: `/subcategories/questions/${item.questions_link}`
                    }} >
                      <Card elevation={4} sx={{ backgroundColor: '#F9F9F9' }}>
                        <div>
                          <Checkbox
                            sx={{ position: 'absolute', top: 0, right: 0, margin: '8px', color: isCheckedArray[index] ? 'primary.main' : 'default' }}
                            icon={<BookmarkBorderIcon />}
                            checkedIcon={<BookmarkIcon />}
                            checked={!isCheckedArray[index]}
                            // onChange={() => setIsChecked(!isChecked)}
                            onChange={() => {
                              const newArray = [...isCheckedArray]
                              newArray[index] = !newArray[index]
                              setIsCheckedArray(newArray)
                            }}
                            onClick={(e) => {
                              e.stopPropagation()
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
                    )
                  : (
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
