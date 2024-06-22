import * as React from 'react'

/* -- Matarials -- */
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Button,
  Container,
  Stack
} from '@mui/material'

/* -- Icons -- */
import DeleteIcon from '@mui/icons-material/Delete'
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import LastPageIcon from '@mui/icons-material/LastPage'
import FirstPageIcon from '@mui/icons-material/FirstPage'

/* -- Styles -- */
import { alpha, useTheme } from '@mui/material/styles'
import { visuallyHidden } from '@mui/utils'

import PropTypes from 'prop-types'
import { GetUsers } from './service/ServiceUser'
import { AppAlert } from '../../commons/AppAlert'
import { DeleteUser, EditUser } from './ModalsUser'

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props

  const showModalUpdate = () => {
  }

  const showModalDelete = () => {
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}
    >
      {numSelected > 1
        ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} usuarios seleccionados
        </Typography>
          )
        : numSelected === 1
          ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} usuario seleccionado
        </Typography>
            )
          : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Resultados
        </Typography>
            )}

      {numSelected === 1
        ? (
        <Stack
          direction="row"
          spacing={0.5}
        >
          <Tooltip title="Edit User">
            <Button
              variant='contained'
              endIcon={<ModeEditOutlineOutlinedIcon />}
              onClick={showModalUpdate}
              sx={{
                color: '#ffffff',
                bgcolor: '#333333',
                ':hover': {
                  color: '#ffffff', bgcolor: '#333333'
                }
              }}
            >
              Editar
            </Button>
          </Tooltip>
          <Tooltip title="Delete User">
            <Button
              variant='contained'
              endIcon={<DeleteIcon />}
              onClick={showModalDelete}
              sx={{
                color: '#333333',
                bgcolor: '#ff1837',
                ':hover': {
                  color: '#ffffff', bgcolor: '#ff1837'
                }
              }}
            >
              Eliminar
            </Button>
          </Tooltip>
        </Stack>
          )
        : numSelected > 1
          ? (
        <Tooltip title="Delete Users">
          <Button
            variant='contained'
            endIcon={<DeleteIcon />}
            onClick={() => showModalDelete()}
            sx={{
              color: '#333333',
              bgcolor: '#ff1837',
              ':hover': {
                color: '#ffffff', bgcolor: '#ff1837'
              }
            }}
          >
            Eliminar
          </Button>
        </Tooltip>
            )
          : (
        <Tooltip title="Tabla de usuarios">
          <IconButton>
            <TableRowsOutlinedIcon />
          </IconButton>
        </Tooltip>
            )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
}

function descendingComparator (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator (order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort (array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  {
    id: 'email',
    numeric: false,
    disablePadding: true,
    label: 'Email'
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Nombre'
  },
  {
    id: 'last_name',
    numeric: false,
    disablePadding: true,
    label: 'Apellidos'
  },
  {
    id: 'role',
    numeric: false,
    disablePadding: true,
    label: 'Rol'
  }
]

function EnhancedTableHead (props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all users'
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id
                ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
                  )
                : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

function TablePaginationActions (props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
}

export default function UserTable () {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const [Users, setUser] = React.useState([])

  const [showUpdate, setShowUpdate] = React.useState(false)
  const handleShowUpdate = () => setShowUpdate(true)
  const handleCloseUpdate = () => setShowUpdate(false)

  const [showDelete, setShowDelete] = React.useState(false)
  const handleShowDelete = () => setShowDelete(true)
  const handleCloseDelete = () => setShowDelete(false)

  const [severityResponse, setSeverityResponse] = React.useState('')
  const [messageResponse, setMessageResponse] = React.useState('')

  const [showAlert, setShowAlert] = React.useState(false)
  const handleShowAlert = () => setShowAlert(true)
  const handleCloseAlert = () => setShowAlert(false)

  const [refreshPage, setRefresh] = React.useState(false)
  const handleRefreshPage = () => setRefresh(true)

  React.useEffect(() => {
    GetUsers().then((users) => setUser(users))
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = Users.map((n) => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (id) => selected.indexOf(id) !== -1

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Users.length) : 0

  const refresh = () => {
    if (refreshPage === true) {
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
  }
  refresh()

  return (
    <Container fixed>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} showModalDelete={handleShowDelete} showModalUpdate={handleShowUpdate} />
          <TableContainer>
            <Table
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={Users.length}
              />
              <TableBody>
                {stableSort(Users, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => {
                    const isItemSelected = isSelected(user.id)
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, user.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={user.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding='checkbox'>
                          <Checkbox
                            color='primary'
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          padding='none'
                        >
                          {user.email}
                        </TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.last_name}</TableCell>
                        <TableCell>{user.role}</TableCell>
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, { label: 'All', value: Users.length }]}
            component='div'
            count={Users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </Paper>
      </Box>
      <DeleteUser
        showDelete={showDelete}
        handleCloseDelete={handleCloseDelete}
        delete_id={selected}
        setSeverityResponse={setSeverityResponse}
        setMessageResponse={setMessageResponse}
        handleShowAlert={handleShowAlert}
        handleRefreshPage={handleRefreshPage}
      />
      <AppAlert
        handleCloseAlert={handleCloseAlert}
        showAlert={showAlert}
        severityResponse={severityResponse}
        messageResponse={messageResponse}
      />
      <EditUser
        showUpdate={showUpdate}
        update_id={selected}
        handleCloseUpdate={handleCloseUpdate}
        setSeverityResponse={setSeverityResponse}
        setMessageResponse={setMessageResponse}
        handleShowAlert={handleShowAlert}
        handleRefreshPage={handleRefreshPage}
      />
    </Container>
  )
}
