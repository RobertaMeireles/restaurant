import React, {useState, useEffect} from 'react'
import services from "../../services/user.service"
import Header from '../../components/Header'
import SiderBar from '../../components/SideBar'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useParams } from "react-router-dom";

export default function DeleteUser () {

    const {id} = useParams();
    const [currentUser, setCurrentUser] = useState([])

    const getUser = () => {
        services.getId(`/users/${id}`)
        .then(response => {
            setCurrentUser(response.data.message)
        })
        .catch(error => {
            console.error(error)
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
    }

    const deleteCategory = (id) => {
        services.deleteId(`/users/delete/${id}`, currentUser)
        .then(response => {
            console.log(response)
            alert(`Usuário deletado.`)
        })
        .catch(error => {
            console.error(error);
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
    }

    console.log(currentUser.id)

    useEffect (() =>{
        getUser()
    },[])


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
                            <h1>Deletar Usuário</h1>
                            <Form className="form-itens">
                                <Form.Group>
                                    <Form.Control type="text"                                  
                                    disabled="disabled"
                                    defaultValue={currentUser.name} />
                                </Form.Group>
                                <Button className="form-submit" variant="primary" type="submit" onClick={() => deleteCategory(currentUser.id)}>
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

