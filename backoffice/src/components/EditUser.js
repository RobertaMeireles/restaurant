import React, { Component }  from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {

    const navigate = useNavigate();
    const {id} = useParams();
    const [inputs, setImputs] = useState([]);

    useEffect (() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get(`http://localhost/crud/${id}`).then(function(response) {
            // console.log(response.data);
            setImputs(response.data);
        });

    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setImputs(values => ({...values, [name]: value}));
    }
    const handleSumit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost/crud/${id}/edit`, inputs).then(function(response) {
            console.log(response.data);
            navigate('/');

        });
    }
    return (
        <div>
            <h1>Edit User</h1>
            <form onSubmit={handleSumit}>
                <label>Name <input value={inputs.name || ''} type="text" name="name" onChange={handleChange}/></label>
                <label> Email <input value={inputs.email || ''} type="text" name="email" onChange={handleChange}/> </label>
                <input type="submit" value="Submit" />
            </form>
        </div>

    )
}