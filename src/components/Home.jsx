import React from 'react';
import { Container } from '@mui/material'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const modules = [
  {
    "module_id": 1,
    "module_name": "TI",
    "resume_module": "Encuentra todo lo relacionado con la tecnología en este modulo"
  },
  {
    "module_id": 2,
    "module_name": "Marketing Digital",
    "resume_module": "Encuentra todo lo relacionado con marketing empresarial"
  },
  {
    "module_id": 3,
    "module_name": "Recursos humanos",
    "resume_module": "Encuentra todo lo relacionado con los recursos humanos"
  },
  {
    "module_id": 4,
    "module_name": "Finanzas o contabilidad",
    "resume_module": "Encuentra todo lo relacionado con las finanzas"
  }
]

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const skeletonLoader = true

export default function Home() {
  return (
    <Container fluid>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {modules.map((module, index) => (
            <Grid  key={index} item xs={4}>
              {skeletonLoader ? (
                <Stack spacing={1}>
                  {/* For variant="text", adjust the height via font-size */}
                  <Skeleton variant="text" width={270} sx={{ fontSize: '1rem' }} />
                  <Skeleton variant="rectangular" width={210} height={50} />
                  <Skeleton variant="rounded" width={100} height={30} />
                </Stack>
              ) : (

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
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>

  )
}
