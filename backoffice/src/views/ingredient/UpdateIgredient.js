import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import services from "../../services/user.service"
import Header from '../../components/Header'
import SiderBar from '../../components/SideBar'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useParams } from "react-router-dom";


export default function UpdateIngredient ()  {

    const navigate = useNavigate()

    const {id} = useParams();
    const [currentIgredient, setCurrentIgredient] = useState([])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCurrentIgredient(values => ({...values, [name]: value}));
    }

    const getIngredient = () => {
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

    const UpdateIngredient= () => {
        services.update(`/ingredients/update/${id}`, currentIgredient)
          .then((res) => {
            console.log(res)
        }).catch((error) => {
            console.error(error)
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
      }

    useEffect (() => {
        if(services.getCurrentUser()) {
            getIngredient();
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
                            <h1 >Atualizar Ingrediente</h1>
                            {currentIgredient ? (
                            <Form className="form-itens" onSubmit={UpdateIngredient}>
                                <Form.Group className="mb-3">
                                    <Form.Control 
                                        type="text" 
                                        value={currentIgredient.name || ''}
                                        name="name"  
                                        onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Control as="select"  
                                            name="unity" 
                                            onChange={handleChange}  value={currentIgredient.unity || ''}>
                                            <option value="">Indique a unidade</option>
                                            <option value="unidade">Unidade</option>
                                            <option value="gramas">Gramas</option>
                                            <option value="ml">ML</option>
                                            <option value="litro">Litro</option>
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
