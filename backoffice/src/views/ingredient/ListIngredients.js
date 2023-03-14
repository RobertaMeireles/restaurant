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


export default function ListIngredients() {

    const navigate = useNavigate()

    const [ingredients, setIngredients] = useState([])

    useEffect (() => {
        getIngredients();
    }, []);

   const getIngredients = () => {
        services.getAll(`/ingredients`)
        .then(response => {
            setIngredients(response.data.message)
        })
        .catch(error => {
            console.error(error);
            alert(`Um problema ocorreu. Tente mais tarde.`)
            navigate('/home')
        })
    }

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
                        <h1>Ingredientes</h1>
                        <Button href="ingrediente/criar" variant="primary">Criar</Button>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Unidade</th>
                                    <th>Update / Deletar</th>
                                </tr>
                            </thead>
                            <tbody>   
                                {ingredients.map((user,key) => 
                                    <tr key={key}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.unity}</td>
                                        <td><a href={'/ingrediente/update/'+ user.id} className="update"><BsPenFill /></a>
                                            <a href={'/ingrediente/deletar/'+ user.id} className="delete" ><AiTwotoneDelete /></a>
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