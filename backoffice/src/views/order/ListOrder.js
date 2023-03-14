import React  from 'react'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import services from "../../services/user.service"
import Header from '../../components/Header'
import SiderBar from '../../components/SideBar'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { AiTwotoneDelete } from "react-icons/ai"
import { BsPenFill } from "react-icons/bs"


export default function ListOrder() {

    const navigate = useNavigate()

    const [orders, setOrder] = useState([])

    useEffect (() => {
        getOrder();
    }, []);

   const getOrder = () => {
        services.getAll(`/companyorders`)
        .then(response => {
            console.log(response.data.message)
            setOrder(response.data.message)
        })
        .catch(error => {
            console.error(error);
            alert(`Um problema ocorreu. Tente mais tarde.`)
            navigate('/home')
        })
    }

    return (
        <>
        <header>
            <Header></Header>
        </header>
        <div className="card-flex">
            <div>
                <SiderBar></SiderBar>
            </div>
            <div className = "card-div">
                <Card>
                    <Card.Body>
                        <h1>Pedidos</h1>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Pedido</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>   
                                {orders.map((order,key) => 
                                    <tr key={key}>
                                        <td>{order.tabletId}</td>
                                        <td>{order.recipeName}</td>
                                        <td>{order.status}</td>
                                        <td><a href={'/pedidos/update/'+ order.id} className="update"><BsPenFill /></a></td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        </div>
    </>
    )
}