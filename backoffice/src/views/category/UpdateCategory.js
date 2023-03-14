import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import services from "../../services/user.service"
import Header from '../../components/Header'
import SiderBar from '../../components/SideBar'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useParams } from "react-router-dom";


export default function UpdateCategory  ()  {

    const navigate = useNavigate()

    const {id} = useParams();
    const [currentCategory, setCurrentCategory] = useState([])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCurrentCategory(values => ({...values, [name]: value}));
    }

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


    const updateCategory= () => {
        services.update(`/categories/update/${id}`, currentCategory)
          .then((res) => {
            console.log(res)
        }).catch((error) => {
            console.error(error)
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
                            <h1>Atualizar Categoria</h1>
                            {currentCategory ? (
                            <Form className="form-itens" onSubmit={updateCategory}>
                                <Form.Group>
                                    <Form.Control type="text" name="name" 
                                    // defaultValue={currentCategory.name}
                                    value={currentCategory.name || ''}
                                    onChange={handleChange}
                                    />
                                </Form.Group>
                                <Button className="form-submit" variant="primary" type="submit">
                                    Update
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
