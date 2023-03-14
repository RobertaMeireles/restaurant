import React, { useEffect, useState } from "react"
import services from "../services/user.service"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import AuthService from "../services/auth.service"


function Header () {

    const [userAdm, setUserAdm] = useState(false)

    const logOut = () => {
        AuthService.logout()
        window.location.href = "/"
    };

    useEffect (() => {
        if(services.getCurrentUser()) {
            setUserAdm(true)
        }
    }, []);

    return (
        <>
        { userAdm ? 
        <Navbar fixed="top" bg="light" expand="lg">
            <Navbar.Brand href="/home"className="logo">Restaurante</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link className="nav-bar" href="/pedidos">Pedidos</Nav.Link>
                <Nav.Link className="nav-bar" href="/categorias">Categorias</Nav.Link>
                <Nav.Link className="nav-bar" href="/ingredientes">Ingredientes</Nav.Link>
                <Nav.Link className="nav-bar" href="/receitas">Receitas</Nav.Link>
                <Nav.Link className="nav-bar" href="/tablets">Tablets</Nav.Link>
                <Nav.Link className="nav-bar" href="/usuarios">Usuários</Nav.Link>
                <Nav.Link className="nav-bar" href="/" onClick={logOut} >Logout</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
        : 
            <Navbar fixed="top" bg="light" expand="lg">
            <Navbar.Brand href="/home"className="logo">Restaurante</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link className="nav-bar" href="/pedidos">Pedidos</Nav.Link>
                <Nav.Link className="nav-bar" href="/" onClick={logOut} >Logout</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
        }   
        </>
    )

}

export default Header