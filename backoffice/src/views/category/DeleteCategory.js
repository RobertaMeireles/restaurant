import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import services from "../../services/user.service"
import Header from '../../components/Header'
import SiderBar from '../../components/SideBar'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useParams } from "react-router-dom";

export default function DeleteProduct () {

    const navigate = useNavigate()

    const {id} = useParams();
    const [currentCategory, setCurrentCategory] = useState([])

    const getCategory = () => {
        services.getId(`/categories/${id}`)
        .then(response => {
            setCurrentCategory(response.data.message)
        })
        .catch(error => {
            console.error(error)
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
    }

    const deleteCategory = (id) => {
        services.deleteId(`/categories/delete/${id}`, currentCategory)
        .then(response => {
            console.log(response)
            alert(`Categoria deletada.`)
        })
        .catch(error => {
            console.error(error);
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
    }

    useEffect (() => {
        if(services.getCurrentUser()) {
            getCategory();
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
                            <h1>Deletar Categoria</h1>
                            <Form className="form-itens">
                                <Form.Group>
                                    <Form.Control type="text"                                  
                                    disabled="disabled"
                                    defaultValue={currentCategory.name} />
                                </Form.Group>
                                <Button className="form-submit" variant="primary" type="submit" onClick={() => deleteCategory(currentCategory.id)}>
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

