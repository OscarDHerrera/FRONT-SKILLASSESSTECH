import React from 'react';
import { Nav,Container, Offcanvas, Navbar } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { Button }  from '@mui/material'

export default function BarraNav(){

    return (
        <main>
            <Navbar bg={'dark'} variant={'dark'} expand={"sm"} sticky={'top'} >
                <Container fluid>
                    <Navbar.Brand href="/">React-Practica</Navbar.Brand>
                    <Navbar.Toggle aria-controls={'responsive-navbar-nav'} />
                    <Navbar.Offcanvas
                        placement="end"
                        className={'bg-dark text-light'}
                    >
                        <Offcanvas.Header
                            className={'bg-secondary'}
                        >
                            <Offcanvas.Title id="offcanvasNavbarLabel">Menú</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className={'justify-content-center'}>
                                <Nav.Link href="/create-person">
                                    {/*<AddCircleOutlineTwoToneIcon sx={{fontSize: 30}}/>*/}
                                    Crear Usuario
                                </Nav.Link>
                                <hr className="bg-light" />
                                <Button href={"/create-person"} variant="text" startIcon={<PersonAddTwoToneIcon />}>
                                    Crear Usuario
                                </Button>
                                <hr className="bg-light" />
                                <Nav.Link href="/person-table">
                                    Ver Usuarios
                                </Nav.Link>
                                <hr className="bg-light" />
                                <Button href={"/person-table"} variant="text" startIcon={<VisibilityTwoToneIcon/>}>
                                    Ver Usuarios
                                </Button>
                                <hr className="bg-light" />
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <section>
                <Outlet />
            </section>
        </main>
    )}