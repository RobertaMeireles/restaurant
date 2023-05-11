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

    const navigate = useNavigate()
    const {id} = useParams();

    const [categories, setCategories] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [currentRecipe, setCurrentRecipe] = useState([])
    const [registerRecipe, setRegisterRecipe] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [currentIngredients, setCurrentIngredients] = useState([])
    const [quantCurrentIngredients, setQuantCurrentIngredients] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [ingredientList, setingredientList] = useState([{id:"", quantity:""}]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setRegisterRecipe(values => ({...values, [name]: value}));
    }
          
    const checkFields = (e) => {
        e.preventDefault();
        if (name && description && categoryId && price && image){
            createRecipe()
            setSubmitted(false)
        }else {
            setSubmitted(true)
        }
    }

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

    const createRecipe = () => {
        const myFormData = new FormData();
        myFormData.append('image', image);
        const formDataObj = {};
        myFormData.forEach((value, key) => (formDataObj[key] = value));

        services.create('/recipes/add', 
            {
                name: name,
                description: description,
                categoryId: categoryId,
                price: price,
                ingredients: [
                    ...ingredientList
                ]
            }).then(function(response) {
                if (response.data){
                    services.createImage(`/recipes/addimage/${response.data.createdId}`, // eslint-disable-line 
                    {
                        image: formDataObj
                    }).then(function(response) {
                        alert(`Receita registrada.`)
                        navigate('/home');
    
                    }).catch((error) => {
                        console.error(error)
                        alert(`Um problema ocorreu. Tente mais tarde.`)
                        navigate('/home');
                    })
                }
            }).catch((error) => {
            console.error(error)
            navigate('/home')
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
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

    const getRecipe = () => {
        services.getId(`/recipes/${id}`)
        .then(response => {
            console.log(response.data.message)
            setCurrentRecipe(response.data.message[0])
            // setQuantCurrentIngredients(response.data.message.length)
            // console.log(quantCurrentIngredients)
            setCurrentIngredients(response.data.message)

        })
        .catch(error => {
            console.error(error)
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
    }

    getRecipe()

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

    useEffect (() => {
        if(services.getCurrentUser()) {
            getCategories();
            getIngredients();
            getRecipe()
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
                        <h1>Atualizar Receita</h1>
                        {currentRecipe ? (
                        <Form className="form-itens" onSubmit={checkFields}>
                        <Form.Group className="mb-3">
                            <Form.Control 
                            type="text" 
                            name="name" 
                            value={currentRecipe.name || ''}
                            onChange={(e) => setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control as="select" 
                                name="categoryId" 
                                value={currentRecipe.categoryId || ''}
                                onChange={(e) => setCategoryId(e.target.value)}>
                                {categories.map((category,key) => 
                                    <option key={key} value={category.id}>{category.name}</option>
                                )}
                            </Form.Control>
                        </Form.Group >
                        <Form.Group className="mb-3">
                            <Form.Control as="textarea" 
                             name="description" 
                             value={currentRecipe.description || ''}
                             rows={3} onChange={(e) => setDescription(e.target.value)}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" 
                            name="price" 
                            value={currentRecipe.price || ''}
                            onChange={(e) => setPrice(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control type="file"  name="image" onChange={(e) => setImage(e.target.files[0])}/>
                        </Form.Group>
                        {
                        ingredientList.map( (x,i)=>{
                        return(
                            <>
                                {currentIngredients.map((ing,key) => 
                                <>
                                <Card>
                                    <Card.Body>
                                        <Form.Group className="mb-3">
                                        <Form.Control as="select" 
                                                        name="id" 
                                                        value={ing.ingredientsId || ''}
                                                        onChange={ e=>handleinputchange(e,i) }>
                                            {ingredients.map((ingredient,key) => 
                                                <option key={key} value={ingredient.id}>{ingredient.name}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group >
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text"  
                                            name="quantity"
                                            value={ing.recipeIngredientsQuantity || ''}
                                            onChange={ e=>handleinputchange(e,i) }/>
                                        </Form.Group>
                                    </Card.Body>
                                </Card>
                                <div>
                                    {
                                    ingredientList.length!==1 &&
                                        <Button className="mt-3 mb-3" variant="danger" onClick={()=> handleremove(i)}>Remover</Button>
                                    }
                                </div>
                                </>
                                )}







                                <Card>
                                    <Card.Body>
                                        <Form.Group className="mb-3">
                                        <Form.Control as="select" 
                                                        name="id" 
                                                        value={currentRecipe.ingredientsId || ''}
                                                        onChange={ e=>handleinputchange(e,i) }>
                                            {ingredients.map((ingredient,key) => 
                                                <option key={key} value={ingredient.id}>{ingredient.name}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group >
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text"  
                                            name="quantity"
                                            value={currentRecipe.recipeIngredientsQuantity || ''}
                                            onChange={ e=>handleinputchange(e,i) }/>
                                        </Form.Group>
                                    </Card.Body>
                                </Card>
                                <div>
                                    {
                                    ingredientList.length!==1 &&
                                        <Button className="mt-3 mb-3" variant="danger" onClick={()=> handleremove(i)}>Remover</Button>
                                    }
                                    <div>
                                        { ingredientList.length-1===i &&
                                            <Button variant="primary" onClick={ handleaddclick}>Acrescentar Ingreendiente</Button>
                                        }
                                    </div>
                                </div>
                            </>
                        );
                    } )} 
                    <Button className="form-submit" variant="primary" type="submit">Criar</Button>
                </Form>
                ) : (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                )}
                    { submitted && <span className='erro-contact'>Preencha todos os campos.</span>} 
                    </Card.Body>
                </Card>
     
                </div>
            </div>
        </div>

    )
}