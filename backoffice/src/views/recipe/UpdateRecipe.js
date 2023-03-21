import React, { useEffect, useState } from "react"
import services from "../../services/user.service"
import { useNavigate } from "react-router-dom"
import Header from '../../components/Header'
import SiderBar from '../../components/SideBar'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useParams } from "react-router-dom";

export default function CreateRecipe() {

    /*
    se passar algum ingrediente que exista com a mesma quantidade vai deletar
    se passar algum ingrediente novo vai acrescentar
    se passar algum ingrediente que exista com a quantidade diferente vai fazer o update
    */

    const navigate = useNavigate()

    const {id} = useParams();
    const [currentRecipe, setCurrentRecipe] = useState([])

    const [categories, setCategories] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [ingredientList, setingredientList] = useState([{id:"", quantity:""}]);
          
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCurrentRecipe(values => ({...values, [name]: value}));
    }

    console.log(currentRecipe)

    const handleinputchange=(e, index)=>{
        const {name, value}= e.target;
        const list= [...ingredientList];
        list[index][name]= value;
        setingredientList(list);
    }

    const handleremove= index=>{
        const list=[...ingredientList];
        list.splice(index,1);
        setingredientList(list);
    }

    const handleaddclick=()=>{ 
        setingredientList([...ingredientList, { id:'', quantity:''}]);
    }

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

    const getRecipe = () => {
        services.getId(`/recipes/${id}`)
        .then(response => {
            console.log(response.data.message[0])
            setCurrentRecipe(response.data.message[0])
        })
        .catch(error => {
            console.error(error)
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
    }

    const UpdateRecipe= () => {
        services.update(`/recipes/update/${id}`, currentRecipe)
          .then((res) => {
            console.log(res)
        }).catch((error) => {
            console.error(error)
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
      }

    useEffect (() => {
        if(services.getCurrentUser()) {
            getRecipe();
            getCategories()
        }
        else {
            navigate('/home')
        }
    }, []);

    return (
        <div>
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
                    <h1>Update Receita</h1>
                        <Form className="form-itens" onSubmit={UpdateRecipe}>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    type="text" 
                                    name="name" 
                                    defaultValue={currentRecipe.recipeName || ''} 
                                    onChange={handleChange}
                                    />
                            </Form.Group>
                            {/* <Form.Group className="mb-3">
                                <Form.Control as="select" 
                                                name="categoryId" 
                                                onChange={handleChange}
                                                 >
                                    <option value="">Escolha a Categoria</option>
                                    {categories.map((category,key) => 
                                        <option key={key} value={category.id}>{category.name}</option>
                                    )}
                                </Form.Control>
                            </Form.Group >
                            <Form.Group className="mb-3">
                                <Form.Control as="textarea" 
                                name="description" rows={3} 
                                defaultValue={currentRecipe.recipeDescription} />
                            </Form.Group> */}
                                <Button className="form-submit" variant="primary" type="submit" >Update</Button>
                        </Form>
                    </Card.Body>
                </Card>
                </div>
            </div>
        </div>

    )
}