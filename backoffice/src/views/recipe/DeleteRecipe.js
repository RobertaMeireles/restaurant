import React, { useEffect, useState } from "react"
import services from "../../services/user.service"
import { useNavigate } from "react-router-dom"
import Header from '../../components/Header'
import SiderBar from '../../components/SideBar'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useParams } from "react-router-dom";

export default function CreateRecipe() {

    const navigate = useNavigate()

    const {id} = useParams();
    const [currentRecipe, setCurrentRecipe] = useState([])

    const deleteRecipe = (id) => {
        services.deleteId(`/recipes/delete/${id}`, currentRecipe)
        .then(response => {
            alert(`Categoria deletada.`)
            navigate('/home')
        })
        .catch(error => {
            console.error(error);
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
    }

    const getRecipe = () => {
        services.getId(`/recipes/${id}`)
        .then(response => {
            setCurrentRecipe(response.data.message[0])
        })
        .catch(error => {
            console.error(error)
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
    }

    useEffect (() => {
        if(services.getCurrentUser()) {
            getRecipe();
        }
        else {
            navigate('/home')
        }
    }, []);

    return (
        <div>
            <header>
                <Header></Header>
            </header>
            <div  className="card-flex">
                <div>
                    <SiderBar></SiderBar>
                </div>
                <div className = "card-div">
                <Card>
                    <Card.Body>
                    <h1>Deletar Receita</h1>
                        <Form className="form-itens">
                            <Form.Group className="mb-3">
                                <Form.Control type="text" 
                                    name="recipeName" 
                                    disabled="disabled"
                                    defaultValue={currentRecipe.recipeName} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="text"     
                                    name="categoryName"                             
                                    disabled="disabled"
                                    defaultValue={currentRecipe.categoryName} />
                                </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control as="textarea" 
                                name="description" rows={3} 
                                defaultValue={currentRecipe.recipeDescription} />
                            </Form.Group>
                                <Button className="form-submit" variant="danger" type="submit" onClick={() => deleteRecipe(id)}>Deletar</Button>
                        </Form>
                    </Card.Body>
                </Card>
                </div>
            </div>
        </div>

    )
}