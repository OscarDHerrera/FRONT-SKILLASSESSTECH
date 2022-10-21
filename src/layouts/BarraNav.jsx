import * as React from 'react';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { GetPages, GetSettings } from './service/LayoutService';

const drawerWidth = 240;

export default function BarraNav() {

  const [pages, setPages] = React.useState([])
  const [settings, setSettings] = React.useState([])

  React.useEffect(
    () => {
      GetPages().then((pages) => { setPages(pages) })
      GetSettings().then((settings) => { setSettings(settings) })
    }, []);


  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [openNav, setOpenNav] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpenNav(!openNav);
  };


  const optionList = (
    <div>
      <Toolbar>
        <AdbIcon sx={{ ml: 2, mr: 1, mb: 0.7 }} />
        <Typography
          component={'a'}
          variant="h6"
          noWrap
          href={"/"}
          sx={{
            mr: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: '#333333',
            textDecoration: 'none',
            cursor: "pointer",
            ":hover": {
              color: '#ff1837',
            }
          }}
        >
          Recruiter
        </Typography>
      </Toolbar>
      <Divider sx={{ bgcolor: '#333333' }} />
      <List>
        {pages.map((page) => (
          <ListItem key={page.id} disablePadding>
            <ListItemButton
              href={`${page.url}`}
              sx={{
                color: '#333333', ":hover": {
                  color: '#ffff', bgcolor: '#333333'
                }
              }}
            >
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <main>
      <AppBar sx={{ bgcolor: '#ff1837' }} position={'sticky'} className="mb-3">
        <Container maxWidth={'xxl'}>
          <Toolbar disableGutters>

            {/* Pantalla Grande  */}

            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, ml: 2, mr: 1, mb: 0.7 }} />
            <Typography
              component={'a'}
              variant="h6"
              noWrap
              href={"/"}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#333333',
                textDecoration: 'none',
                cursor: "pointer",
                ":hover": {
                  color: 'white',
                }
              }}
            >
              Recruiter
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  href={`${page.url}`}
                  key={page.id}
                  sx={{
                    marginTop: '5px', color: '#333333', ":hover": {
                      color: '#ffff', bgcolor: '#333333'
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
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleDrawerToggle}
                  sx={{ color: '#333333' }}
                >
                  <MenuIcon />
                </IconButton>
                <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, mb: 0.8 }} />
                <Typography
                  variant="h5"
                  noWrap
                  // to={'/'}
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: '#333333',
                    textDecoration: 'none',
                    ":hover": {
                      color: 'white',
                    }
                  }}
                >
                  Recruiter
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
                    keepMounted: true,
                  }}
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                  }}

                >
                  {optionList}
                </Drawer>

                <Drawer
                  variant="temporary"
                  open={openNav}
                  onClose={handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true,
                  }}
                  sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                  }}
                >
                  {optionList}
                </Drawer>
              </Box>
            </Box>

            {/* Sección conf User */}

            <Box sx={{ flexGrow: 0 }}>
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
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
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
                      color: '#333333', ":hover": {
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

