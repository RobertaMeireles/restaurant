import React, { Component }  from 'react';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function CreateUser() {

    const navigate = useNavigate();

    const [inputs, setImputs] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setImputs(values => ({...values, [name]: value}));
    }
    const handleSumit = (event) => {
        event.preventDefault();

        axios.post('http://localhost/crud/', inputs).then(function(response) {
        // axios.post('http://api-restaurant.test/public/', inputs).then(function(response) {
            console.log(response.data);
            navigate('/');

        });
    }
    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSumit}>
                <label>Name <input type="text" name="name" onChange={handleChange}/></label>
                <label> Email <input type="text" name="email" onChange={handleChange}/> </label>
                <input type="submit" value="Submit" />
            </form>
        </div>

    )
}