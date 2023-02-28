import React, { Component }  from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import {Link } from 'react-router-dom';

export default function ListUsers() {

    const [users, setUsers] = useState([]);
    useEffect (() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost/crud/').then(function(response) {
            // console.log(response.data);
            setUsers(response.data);
        });

    }

    const deleteUser = (id) => {
        axios.delete(`http://localhost/crud/${id}/delete`).then(function(response) {
            console.log(response.data);
            getUsers();
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
                        <th>E-mail</th>
                    </tr>
                </thead>
                <tbody>   
                    {users.map((user,key) => 
                        <tr key={key}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link to={`user/${user.id}/edit`}>Edit</Link>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>

                    
                    )}
                </tbody>
            </table>

        </div>

    )
}