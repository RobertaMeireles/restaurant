import React from 'react'
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


export default function ListRecipes() {

    const navigate = useNavigate()

    const [recipes, setRecipes] = useState([]);

    useEffect (() => {
        getRecipes()
    }, []);


    const getRecipes = () => {
        services.getAll(`/recipes`)
        .then(response => {
            setRecipes(response.data.message)
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
                    <h1>Receitas</h1>
                    <Button href="receita/criar" variant="primary">Criar</Button>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Update / Delete</th>
                                </tr>
                            </thead>
                            <tbody>   
                                {recipes.map((recipe,key) => 
                                    <tr key={key}>
                                        <td>{recipe.id}</td>
                                        <td>{recipe.name}</td>
                                        <td>{recipe.description}</td>
                                        <td><a href={'receita/update/'+ recipe.id} className="update"><BsPenFill /></a>
                                            <a href={'receita/deletar/'+ recipe.id} className="delete" ><AiTwotoneDelete /></a>
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