import React, { useState } from "react"
import services from "../../services/user.service"
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header'
import SiderBar from '../../components/SideBar'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function CreateUser  () {

    const navigate = useNavigate();

    const [submitted, setSubmitted] = useState(false)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('')
    const [restaurantId, setRestaurantId] = useState('')

    const checkFields = (e) => {
        e.preventDefault()
        if (name, username, password, restaurantId){
            setRestaurantId(parseInt(restaurantId))
            createUser()
            setSubmitted(false)
        }else {
            setSubmitted(true)
        }
    }

    const createUser = () => {
        services.create('/users/add', 
            {
                name: name,
                username: username,
                password: password,
                type: type,
                restaurantId: 1

            })
        .then((res) => {
            if (res) {
                navigate('/home')
                alert(`Usuário criado.`)
            }
        }).catch((error) => {
            console.error(error)
            navigate('/home')
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
    }

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
                            <h1>Novo Usuário</h1>
                            <Form className="form-itens" onSubmit={checkFields}>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Name" name="name" onChange={(e) => setName(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Username" name="username" onChange={(e) => setUsername(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Senha" name="password" onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group >
                                <Form.Group className="mb-3">
                                    <Form.Control as="select" 
                                                    name="type" 
                                                    onChange={(e) => setType(e.target.value)}>
                                    <option value="1">Administrador</option>
                                    <option value="2">Usuário</option>
                                    </Form.Control>
                                </Form.Group >
                                <Form.Group >
                                    <Form.Control as="select"  
                                                    name="restaurantId" 
                                                    onChange={(e) => setRestaurantId(e.target.value)}>
                                    <option value="1">Come Bem</option>
                                    </Form.Control>
                                </Form.Group>
                                <Button className="form-submit" variant="primary" type="submit">
                                    Criar
                                </Button>
                            </Form>
                            { submitted && <span className='erro-contact'>Preencha todos os campos.</span>} 
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}
