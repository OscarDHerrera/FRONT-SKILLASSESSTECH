import * as React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem
} from '@mui/material';
import {Outlet} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import {Link} from 'react-router-dom'

export default function BarraNav() {

    const pages =
        [
            {id: 1, name: 'Crear Usuario', url: '/create-user'},
            {id: 2, name: 'Ver Usuario', url: '/users-table'}
        ]

    const settings =
        [
            {id: 1, name: 'Profile', url: '/Profile'},
            {id: 2, name: 'Account', url: '/Account'}
        ]

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <main>
            <AppBar sx={{bgcolor: '#ff1837'}} position={'static'}>
                <Container maxWidth={'xxl'}>
                    <Toolbar disableGutters>
                        <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to={'/'}
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
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
                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                sx={{color: '#333333'}}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                                        <Button
                                            component={Link}
                                            to={page.url}
                                            key={page.id}
                                            onClick={handleCloseNavMenu}
                                            sx={{
                                                my: 2, color: '#333333', display: 'block', ":hover": {
                                                    color: '#333333',
                                                }
                                            }
                                            }
                                        >
                                            {page.name}
                                        </Button>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                        <Typography
                            variant="h5"
                            noWrap
                            component={Link}
                            to={'/'}
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
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
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                <Button
                                    component={Link}
                                    to={page.url}
                                    key={page.id}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2, color: '#333333', display: 'block', ":hover": {
                                            color: '#333333',
                                        }
                                    }
                                    }
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Configuración de Cuenta">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '54px'}}
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
                                    <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">
                                            <Button
                                                component={Link}
                                                to={setting.url}
                                                key={setting.id}
                                                onClick={handleCloseNavMenu}
                                                sx={{
                                                    my: 2, color: '#333333', display: 'block', ":hover": {
                                                        color: '#333333',
                                                    }
                                                }
                                                }
                                            >
                                                {setting.name}
                                            </Button>
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <section>
                <Outlet/>
            </section>
        </main>
    )
}