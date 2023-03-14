import React, { useEffect, useState } from "react"
import services from "../../services/user.service"
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header'
import SiderBar from '../../components/SideBar'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function CreateIngredient  () {

    const navigate = useNavigate();

    const [submitted, setSubmitted] = useState(false)
    const [name, setName] = useState('')
    const [unity, setUnity] = useState('')

    const checkFields = (e) => {
        e.preventDefault()
        if (name, unity){
            createIngredient()
            setSubmitted(false)
        }else {
            setSubmitted(true)
        }
    }

    const createIngredient = () => {
        services.create('/ingredients/add', 
            {
                name: name,
                unity: unity
            })
        .then((res) => {
            if (res) {
                navigate('/home')
                alert(`Ingrediente criado.`)
            }
        }).catch((error) => {
            console.error(error)
            navigate('/home')
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
    }

    useEffect (() => {
        if(!services.getCurrentUser()) {
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
                            <h1>Novo Ingrediente</h1>
                            <Form className="form-itens" onSubmit={checkFields}>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Name" name="name" onChange={(e) => setName(e.target.value)} />
                                </Form.Group >
                                <Form.Group className="mb-3" >
                                    <Form.Control as="select"  
                                        name="restaurantId" 
                                         onChange={(e) => setUnity(e.target.value)}>
                                        <option value="">Indique a unidade</option>
                                        <option value="unidade">Unidade</option>
                                        <option value="gramas">Gramas</option>
                                        <option value="ml">ML</option>
                                        <option value="litro">Litro</option>
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
