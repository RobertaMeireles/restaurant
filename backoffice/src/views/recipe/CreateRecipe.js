import React, { useEffect, useState } from "react"
import services from "../../services/user.service"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Header from '../../components/Header'
import SiderBar from '../../components/SideBar'

import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function CreateRecipe() {

    const navigate = useNavigate();

    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    const headersImage = {
        'headers' : {
            "Content-Type": 'multipart/form-data',
        }
    }

    const headers = {
        'headers' : {
            "Content-Type": 'application/json',
        }
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

    const createRecipe = () => {
        const myFormData = new FormData();
        myFormData.append('image', image);
        const formDataObj = {};
        myFormData.forEach((value, key) => (formDataObj[key] = value));

        axios.post('https://project-tcc.test/restaurant-api/public/recipes/add',
        {
            name: name,
            description: description,
            categoryId: categoryId,
            price: price,
        },headers
        ).then(function(response) {
            if (response.data){
                axios.post( `https://project-tcc.test/restaurant-api/public/recipes/addimage/${response.data.createdId}`, // eslint-disable-line
                {
                  image: formDataObj
                },headersImage
                ) .then(function(response) {
                    alert(`Receita registrada.`)
                    navigate('/');

                }).catch((error) => {
                    console.error(error)
                    alert(`Um problema ocorreu. Tente mais tarde.`)
                    navigate('/');
                })
            }
        }).catch((error) => {
            console.error(error)
            alert(`Um problema ocorreu. Tente mais tarde.`)
            navigate('/home');
        });
    }

    useEffect (() => {
        if(!services.getCurrentUser()) {
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
                    <h1>Criar Receita</h1>
                    <Form className="form-itens" onSubmit={checkFields}>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Nome" name="nome" onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Categoria" name="categoryId" onChange={(e) => setCategoryId(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control as="textarea" placeholder="Descrição" name="description" rows={3} onChange={(e) => setDescription(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Categoria" name="price" onChange={(e) => setPrice(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control type="file"  name="image" onChange={(e) => setImage(e.target.files[0])}/>
                    </Form.Group>
                    <Button className="form-submit" variant="primary" type="submit">Criar</Button>
                        {/* <label>Nome <input type="text" name="name" onChange={(e) => setName(e.target.value)}/></label> */}
                        {/* <label> Descrição <input type="text" name="description" onChange={(e) => setDescription(e.target.value)}/> </label>
                        <label> Categoria <input type="text" name="categoryId" onChange={(e) => setCategoryId(e.target.value)}/> </label>
                        <label> Preço <input type="text" name="price" onChange={(e) => setPrice(e.target.value)}/> </label>
                        <label> Imagem <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])}/> </label> */}
                        {/* <label> idIngrediente <input type="text" name="ingredients['id']" onChange={handleChange}/> </label>
                        <label> idIngrediente <input type="text" name="ingredients['quantity']" onChange={handleChange}/> </label> */}
                        {/* <input type="submit" value="Submit" /> */}
                    {/* </form> */}

                    </Form>
                    { submitted && <span className='erro-contact'>Preencha todos os campos.</span>} 
                    </Card.Body>
                </Card>
                </div>
            </div>
        </div>

    )
}