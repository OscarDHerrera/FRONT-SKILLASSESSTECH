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
  CardActionArea,
  Divider
} from '@mui/material'
import Stack from '@mui/material/Stack'

import { GetCategories } from './service/ServiceHome'
import Checkbox from '@mui/material/Checkbox'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import PropTypes from 'prop-types'

export default function Favorites () {
  const [vacancies, setVacancies] = React.useState([])
  const [isCheckedArray, setIsCheckedArray] = React.useState([])
  const MyComponent = (props) => <h2>{props.label}</h2>
  MyComponent.propTypes = {
    label: PropTypes.string.isRequired
  }
  React.useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const fetchedData = await GetCategories()
        const transformedData = fetchedData.map((vacancy) => ({
          id: vacancy.id,
          name: vacancy.title,
          description: vacancy.description
        }))
        setVacancies(transformedData)
        setIsCheckedArray(new Array(transformedData.length).fill(false)) // Inintialize isCheckedArray with the correct length
      } catch (error) {
        console.error('Error fetching vacancies:', error)
      }
    }
    fetchVacancies()
  }, [])
  const handleCheckboxChange = (index) => {
    const newArray = [...isCheckedArray]
    newArray[index] = !newArray[index]
    setIsCheckedArray(newArray)
  }

  return (
    <Container fixed>
      <MyComponent label="Explora las vacantes" />
      <Box sx={{ flexGrow: 1, my: 2 }}>
        <Grid container spacing={2} columns={{ xs: 2, sm: 4, md: 12 }}>
          {vacancies.map((vacancy, index) => (
            <Grid item xs={2} sm={4} md={4} key={vacancy.id}>
              <CardActionArea component={Link} to={`/subcategories/questions/${vacancy.id}`}>
                <Card elevation={4} sx={{ backgroundColor: '#F9F9F9', position: 'relative' }}>
                <Box p={1}>
                <Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
                  <Checkbox
                    sx={{ position: 'absolute', top: 0, right: 0, margin: '8px', color: 'primary.main' }}
                    icon={<BookmarkBorderIcon />}
                    checkedIcon={<BookmarkIcon />}
                    checked={isCheckedArray[index]}
                    onChange={() => handleCheckboxChange(index)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  </Stack>
                  </Box>
                  <CardContent>
                    <Typography variant="h6" color="text.primary">
                      {vacancy.name}
                    </Typography>
                    <Divider style={{ border: ' 1px solid ' }}/>
                    <Box p={2}>
                    <Typography variant="subtitle1" color="text.secondary">
                      {vacancy.description}
                    </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Chip label={'Preguntas'} sx={ { color: 'white', background: 'black', alignItems: 'center', fontSize: 14, fontWeight: 'bold' } } variant="outlined"/>
                  </CardActions>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
          {vacancies.length === 0 &&
            Array.from(new Array(3)).map((_, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Card elevation={4} sx={{ backgroundColor: '#F9F9F9' }}>
                  <CardContent>
                    <Typography variant="h6" color="text.primary">
                      <Skeleton animation="wave" />
                    </Typography>
                    <Typography variant="subtitle1">
                      <Skeleton animation="wave" />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Skeleton variant="rounded" animation="wave" width={'20%'} height={'30px'} />
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  )
}
