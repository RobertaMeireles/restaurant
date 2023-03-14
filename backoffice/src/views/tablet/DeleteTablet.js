import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import services from "../../services/user.service"
import Header from '../../components/Header'
import SiderBar from '../../components/SideBar'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useParams } from "react-router-dom";

export default function DeleteTablet () {

    const navigate = useNavigate()

    const {id} = useParams();
    const [currentTablet, setCurrentTablet] = useState([])

    const getTablet = () => {
        services.getId(`/tablets/${id}`)
        .then(response => {
            setCurrentTablet(response.data.message)
        })
        .catch(error => {
            console.error(error)
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
    }

    const deleteTablet = (id) => {
        services.deleteId(`/tablets/delete/${id}`, currentTablet)
        .then(response => {
            console.log(response)
            alert(`Tablet deletado.`)
        })
        .catch(error => {
            console.error(error);
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
    }

    useEffect (() => {
        if(services.getCurrentUser()) {
            getTablet();
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
                            <h1>Deletar Tablet</h1>
                            <Form className="form-itens">
                                <Form.Group>
                                    <Form.Control type="text"                                  
                                    disabled="disabled"
                                    defaultValue={currentTablet.id} />
                                </Form.Group>
                                <Button className="form-submit" variant="primary" type="submit" onClick={() => deleteTablet(currentTablet.id)}>
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

