import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import services from "../../services/user.service"
import Header from '../../components/Header'
import SiderBar from '../../components/SideBar'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useParams } from "react-router-dom";


export default function UpdateUser  ()  {

    const navigate = useNavigate()

    const {id} = useParams();
    const [currentUser, setCurrentUser] = useState([])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCurrentUser(values => ({...values, [name]: value}));
    }

    const getUser = () => {
        services.getId(`/users/${id}`)
        .then(response => {
            console.log(response.data.message)
            setCurrentUser(response.data.message)
        })
        .catch(error => {
            console.error(error)
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
    }

    const updateUser= () => {
        services.update(`/users/update/${id}`, currentUser)
          .then((res) => {
            console.log(res)
        }).catch((error) => {
            console.error(error)
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
      }

    useEffect (() => {
        if(services.getCurrentUser()) {
            getUser();
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
                            <h1>Atualizar Usuário</h1>
                            {currentUser ? (
                            <Form className="form-itens" onSubmit={updateUser}>
                                <Form.Group className="mb-3">
                                    <Form.Control 
                                        type="text" 
                                        value={currentUser.name || ''}
                                        name="name"  
                                        onChange={handleChange} />
                                    </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control 
                                        type="text" 
                                        value={currentUser.username || ''} 
                                        name="username" 
                                        onChange={handleChange} />
                                    </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control 
                                        type="text" 
                                        value={currentUser.password || ''} 
                                        name="password" 
                                        onChange={handleChange} />
                                    </Form.Group >
                                <Form.Group className="mb-3" >
                                    <Form.Control as="select" 
                                        name="type" 
                                        onChange={handleChange}  value={currentUser.type || ''}>
                                        <option value="adm">Administrador</option>
                                        <option value="user">Usuário</option>
                                    </Form.Control>
                                </Form.Group >
                                <Form.Group >
                                    <Form.Control as="select"  
                                        name="restaurantId" 
                                        onChange={handleChange}
                                        value={currentUser.restaurantId || ''}>
                                    <option value="1">Come Bem</option>
                                    </Form.Control>
                                </Form.Group>
                                <Button className="form-submit" variant="primary" type="submit">
                                    Atualizar
                                </Button>
                            </Form>
                            ) : (
                                <div>
                                    <h1>Loading...</h1>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}
