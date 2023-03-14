import React, { useState } from "react"
import services from "../../services/user.service"
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header'
import SiderBar from '../../components/SideBar'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function CreateCategory  () {

    const navigate = useNavigate();

    const [submitted, setSubmitted] = useState(false)
    const [name, setName] = useState('')

    const checkFields = (e) => {
        e.preventDefault()
        if (name){
            createCategory()
            setSubmitted(false)
        }else {
            setSubmitted(true)
        }
    }

    const createCategory = () => {
        services.create('/categories/add', 
            {
                name: name
            })
        .then((res) => {
            if (res) {
                navigate('/home')
                alert(`Categoria criada.`)
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
                            <h1>Nova Categoria</h1>
                            <Form className="form-itens" onSubmit={checkFields}>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Name" name="name" onChange={(e) => setName(e.target.value)} />
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
