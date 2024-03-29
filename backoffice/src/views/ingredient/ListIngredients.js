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

    useEffect (() => {
        if(services.getCurrentUser()) {
            getIngredients();
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
                                {ingredients.map((ingredient,key) => 
                                    <tr key={key}>
                                        <td>{ingredient.id}</td>
                                        <td>{ingredient.name}</td>
                                        <td>{ingredient.unity}</td>
                                        <td><a href={'/ingrediente/update/'+ ingredient.id} className="update"><BsPenFill /></a>
                                            <a href={'/ingrediente/deletar/'+ ingredient.id} className="delete" ><AiTwotoneDelete /></a>
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