import React, { useEffect, useState } from "react"
import services from "../services/user.service"
import Nav from 'react-bootstrap/Nav';
import AuthService from "../services/auth.service";
import { BiFoodMenu } from 'react-icons/bi';
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineFastfood } from "react-icons/md";
import { TbCategory2 } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { IoBeerOutline } from "react-icons/io5";
import { HiOutlineDeviceTablet } from "react-icons/hi";

const SideBar = () => {

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
        <div className="side" >
            <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link className="side-bar" href="/pedidos"><MdOutlineFastfood /> Pedidos </Nav.Link>
                <Nav.Link className="side-bar" href="/categorias"><TbCategory2 /> Categorias</Nav.Link>
                <Nav.Link className="side-bar" href="/ingredientes"><IoBeerOutline/> Ingredientes</Nav.Link>
                <Nav.Link className="side-bar" href="/receitas"><BiFoodMenu /> Receitas</Nav.Link>
                <Nav.Link className="side-bar" href="/tablets"><HiOutlineDeviceTablet /> Tablets</Nav.Link>
                <Nav.Link className="side-bar" href="/usuarios"><FiUser /> Usuários</Nav.Link>
                <Nav.Link className="side-bar" href="/" onClick={logOut} ><IoLogOutOutline /> Logout</Nav.Link>
            </Nav>
        </div>
        : 
        <div className="side" >
        <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link className="side-bar" href="/pedidos"><MdOutlineFastfood /> Pedidos </Nav.Link>
            <Nav.Link className="side-bar" href="/" onClick={logOut} ><IoLogOutOutline /> Logout</Nav.Link>
        </Nav>
    </div>
        } 
        </>
    )
}

export default SideBar;
