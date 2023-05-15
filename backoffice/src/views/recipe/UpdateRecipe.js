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

    const [categories, setCategories] = useState([])
    const [ingredients, setIngredients] = useState([])
   

    const [recipe, setRecipe] = useState([])
    const [currentIngredients, setCurrentIngredients] = useState([]) // array dos ingredientes que estavam registrados
    const [ originalIngredients, setOriginalIngredients] = useState([]) // array original



    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setRecipe(values => ({...values, [name]: value}));
    }

    const UpdateIngredient= () => {
        services.update(`/recipes/update/${id}`, currentIgredient)
          .then((res) => {
            console.log(res)
        }).catch((error) => {
            console.error(error)
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
    }

    // GET CATEGORIES
    const getCategories = () => {
        services.getAll(`/categories`)
        .then(response => {
            setCategories(response.data.message)
        })
        .catch(error => {
            console.error(error);
            alert(`Um problema ocorreu. Tente mais tarde.`)
            navigate('/home')
        })
   }

   // GET INGREDIENTS
   const getIngredients = () => {
        services.getAll(`/ingredients`)
        .then(response => {
            setIngredients(response.data.message)
        })
        .catch(error => {
            console.error(error);
            alert(`Um problema ocorreu. Tente mais tarde.`)
            navigate('/home')
        })
    }

    // GET RECIPE
    const getRecipe = () => {
        services.getId(`/recipes/${id}`)
        .then(response => {
            setRecipe(response.data.message)
            console.log(response.data.message)
        })
        .catch(error => {
            console.error(error)
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
    }

    useEffect (() => {
        if(services.getCurrentUser()) {
            getIngredients()
            getCategories()
            getRecipe()
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
                            <h1 >Atualizar Receita</h1>
                            <Form className="form-itens" onSubmit={UpdateIngredient}>
                                <Form.Group className="mb-3">
                                    <Form.Control 
                                        type="text" 
                                        value={recipe.name || ''}
                                        name="name"  
                                        onChange={handleChange} 
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control as="select" 
                                                    name="categoryId" 
                                                    onChange={handleChange}  
                                                    value={recipe.categoryId || ''}>
                                        {categories.map((category,key) => 
                                            <option key={key} value={category.id}>{category.name}</option>
                                        )}
                                    </Form.Control>
                                </Form.Group >

                                <Form.Group className="mb-3">
                                    <Form.Control 
                                    type="text" 
                                    value={recipe.price || ''}
                                    name="price" 
                                    onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Control as="textarea" 
                                    placeholder="Descrição" 
                                    name="description" 
                                    value={recipe.description || ''}
                                    rows={3} 
                                    onChange={handleChange}/>
                                </Form.Group>
                                
                                <Button className="form-submit" variant="primary" type="submit">Atualizar</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}
