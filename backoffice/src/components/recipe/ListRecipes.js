import React, { Component }  from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import {Link } from 'react-router-dom';

export default function ListRecipes() {

    const [products, setProducts] = useState([]);
    useEffect (() => {
        getUsers();
    }, []);

    function getUsers() {
         axios.get('https://project-tcc.test/restaurant-api/public/recipes').then(function(response) {
            // console.log(response.data.message);
            setProducts(response.data.message);
        });
    }

    return (
        <div>
            <h1>List Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>   
                    {products.map((product,key) => 
                        <tr key={key}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>

    )
}