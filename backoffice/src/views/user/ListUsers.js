import React  from 'react'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import services from "../../services/user.service"
import Header from '../../components/Header'
import SiderBar from '../../components/SideBar'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { AiTwotoneDelete } from "react-icons/ai"
import { BsPenFill } from "react-icons/bs"

export default function ListUser() {

   const navigate = useNavigate()

   const [users, setUsers] = useState([])

   const getUsers = () => {
        services.getAll(`/users`)
        .then(response => {
            setUsers(response.data.message)
        })
        .catch(error => {
            console.error(error);
            alert(`Um problema ocorreu. Tente mais tarde.`)
            navigate('/home')
        })
    }

    useEffect (() => {
        if(services.getCurrentUser()) {
            getUsers();
        }
        else {
            navigate('/home')
        }
    }, []);

    return (
        <>
        <header>
            <Header></Header>
        </header>
        <div className="card-flex">
            <div>
                <SiderBar></SiderBar>
            </div>
            <div className = "card-div">
                <Card>
                    <Card.Body>
                        <h1>Categorias</h1>
                        <Button href="usuario/criar" variant="primary">Criar</Button>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Update / Deletar</th>
                                </tr>
                            </thead>
                            <tbody>   
                                {users.map((user,key) => 
                                    <tr key={key}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td><a href={'/usuario/update/'+ user.id} className="update"><BsPenFill /></a>
                                            <a href={'/usuario/deletar/'+ user.id} className="delete" ><AiTwotoneDelete /></a>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        </div>
    </>
    )
}