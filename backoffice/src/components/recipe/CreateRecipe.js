import React, { Component }  from 'react';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function CreateUser() {

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
            if (response.data) {
                axios.post(`https://project-tcc.test/restaurant-api/public/recipes/addimage/${response.data.createdId}`,
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
            navigate('/');
        });
    }

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={checkFields}>
                <label>Nome <input type="text" name="name" onChange={(e) => setName(e.target.value)}/></label>
                <label> Descrição <input type="text" name="description" onChange={(e) => setDescription(e.target.value)}/> </label>
                <label> Categoria <input type="text" name="categoryId" onChange={(e) => setCategoryId(e.target.value)}/> </label>
                <label> Preço <input type="text" name="price" onChange={(e) => setPrice(e.target.value)}/> </label>
                <label> Imagem <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])}/> </label>
                {/* <label> idIngrediente <input type="text" name="ingredients['id']" onChange={handleChange}/> </label>
                <label> idIngrediente <input type="text" name="ingredients['quantity']" onChange={handleChange}/> </label> */}
                <input type="submit" value="Submit" />
            </form>
            { submitted && <span className='erro-contact'>All fields are required.</span>} 
        </div>

    )
}