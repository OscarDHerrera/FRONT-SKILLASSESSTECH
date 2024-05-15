import * as React from 'react'
import {
  AppBar,
  Container,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Tooltip,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material'
import { GetPages, GetSettings } from './service/LayoutService'
import BlackIcon from '../commons/images/black2.ico'
import PropTypes from 'prop-types'

const drawerWidth = 240

export default function BarraNav () {
  const [pages, setPages] = React.useState([])
  const [settings, setSettings] = React.useState([])
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [openNav, setOpenNav] = React.useState(false)

  React.useEffect(
    () => {
      GetPages().then((pages) => { setPages(pages) })
      GetSettings().then((settings) => { setSettings(settings) })
    }, [])

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleDrawerToggle = () => {
    setOpenNav(!openNav)
  }

  function NavegationsList ({ items }) {
    NavegationsList.propTypes = {
      items: PropTypes.array
    }
    return (
      <List>
        {items.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              href={`${item.url}`}
              sx={{
                color: '#083cbc',
                ':hover': {
                  color: '#ffff', bgcolor: '#333333'
                }
              }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    )
  }

  const skillassesstechTypographyStyle = {
    fontWeight: 'bold',
    textDecoration: 'none',
    cursor: 'pointer'
  }

  const optionList = (
    <div>
      <Toolbar>

        {/* Pantalla Pequeña Navbar  */}

        <IconButton onClick={handleDrawerToggle} sx={{ mr: 2 }}>
          <img
            src={BlackIcon}
            alt="My icon"
            style={{
              transition: '0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.2)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          />
        </IconButton>
        <Typography
          component={'a'}
          variant="h6"
          noWrap
          href={'/'}
          sx={{
            mr: 2,
            color: '#333333',
            ...skillassesstechTypographyStyle,
            ':hover': {
              color: '#083cbc'
            }
          }}
        >
          SAT
        </Typography>
      </Toolbar>
      <Divider sx={{ bgcolor: '#333333' }} />
      <NavegationsList items={pages} />
      <NavegationsList items={settings} />
    </div>
  )

  return (
    <main>
      <AppBar sx={{ bgcolor: '#FFFFFF' }} position={'sticky'} className="mb-3">
        <Container maxWidth={'xxl'}>
          <Toolbar disableGutters>
            {/* Pantalla Grande  */}
            <IconButton href={'/'} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <img
                src={BlackIcon}
                alt="My icon"
                style={{
                  transition: '0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.2)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              />
            </IconButton>
            <Typography
              component={'a'}
              variant="h6"
              noWrap
              href={'/'}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                color: '#333333',
                ...skillassesstechTypographyStyle,
                ':hover': {
                  color: '#083cbc'
                }
              }}
            >
              SKILLASSESSTECH
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  href={`${page.url}`}
                  key={page.id}
                  sx={{
                    marginTop: '5px',
                    color: '#333333',
                    ':hover': {
                      color: '#ffff', bgcolor: '#083cbc'
                    }
                  }
                  }
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* Pantalla Pequeña  */}

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <Toolbar>
                <IconButton
                  size="large"
                  aria-controls="menu-appbar"
                  onClick={handleDrawerToggle}
                >
                  <img
                    src={BlackIcon}
                    alt="My icon"
                    style={{
                      transition: '0.3s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.2)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  />
                </IconButton>
                <Typography
                  component={'a'}
                  variant="h6"
                  noWrap
                  href={'/'}
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    color: '#333333',
                    ...skillassesstechTypographyStyle,
                    ':hover': {
                      color: '#083cbc'
                    }
                  }}
                >
                  SKILLASSESSTECH
                </Typography>
              </Toolbar>
              <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              >

                <Drawer
                  variant="temporary"
                  open={openNav}
                  onClose={handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true
                  }}
                  sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                      boxSizing: 'border-box',
                      width: drawerWidth
                    }
                  }}
                >
                  {optionList}
                </Drawer>

                <Drawer
                  variant="temporary"
                  open={openNav}
                  onClose={handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true
                  }}
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                  }}

                >
                  {optionList}
                </Drawer>

              </Box>
            </Box>

            {/* Sección conf User */}

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Tooltip title="Configuración de Cuenta">
                <IconButton onClick={handleOpenUserMenu} sx={{ mr: 2 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '54px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    component={'a'}
                    href={`${setting.url}`}
                    key={setting.id}
                    sx={{
                      color: '#333333',
                      ':hover': {
                        color: '#ffff', bgcolor: '#333333'
                      }
                    }}
                    onClick={handleCloseUserMenu}>
                    {setting.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </main>
  )
}
