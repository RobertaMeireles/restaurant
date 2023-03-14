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


export default function ListCategories() {

    const navigate = useNavigate()

    const [categories, setCategories] = useState([])

    useEffect (() => {
        getCategories();
    }, []);

   const getCategories = () => {
        services.getAll(`/categories`)
        .then(response => {
            setCategories(response.data.message)
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
                        <h1>Categorias</h1>
                        <Button href="categoria/criar" variant="primary">Criar</Button>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Update / Deletar</th>
                                </tr>
                            </thead>
                            <tbody>   
                                {categories.map((category,key) => 
                                    <tr key={key}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                        <td><a href={'/categoria/update/'+ category.id} className="update"><BsPenFill /></a>
                                            <a href={'/categoria/deletar/'+ category.id} className="delete" ><AiTwotoneDelete /></a>
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