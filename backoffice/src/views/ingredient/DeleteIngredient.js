import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import services from "../../services/user.service"
import Header from '../../components/Header'
import SiderBar from '../../components/SideBar'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useParams } from "react-router-dom";

export default function DeleteIngredient () {

    const navigate = useNavigate()

    const {id} = useParams();
    const [currentIgredient, setCurrentIgredient] = useState([])

    const getIngredients = () => {
        services.getId(`/ingredients/${id}`)
        .then(response => {
            console.log(response.data.message)
            setCurrentIgredient(response.data.message)
        })
        .catch(error => {
            console.error(error)
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
    }

    const deleteCategory = (id) => {
        services.deleteId(`/ingredients/delete/${id}`, currentIgredient)
        .then(response => {
            console.log(response)
            alert(`Usuário deletado.`)
        })
        .catch(error => {
            console.error(error);
            alert(`Um problema ocorreu. Tente mais tarde.`)
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
            <div  className="card-flex">
                <div>
                    <SiderBar></SiderBar>
                </div>
                <div className = "card-div">
                    <Card>  
                        <Card.Body>
                            <h1>Deletar Ingrediente</h1>
                            <Form className="form-itens">
                                <Form.Group className="mb-3">
                                    <Form.Control type="text"                                  
                                    disabled="disabled"
                                    defaultValue={currentIgredient.name} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="text"                                  
                                    disabled="disabled"
                                    defaultValue={currentIgredient.unity} />
                                </Form.Group>
                                <Button className="form-submit" variant="primary" type="submit" onClick={() => deleteCategory(currentIgredient.id)}>
                                    Deletar
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}

