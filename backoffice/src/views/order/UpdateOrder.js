import React  from 'react'
import { useEffect, useState } from "react"
import services from "../../services/user.service"
import Header from '../../components/Header'
import SiderBar from '../../components/SideBar'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form'


export default function UpdateOrder() {
    const {id} = useParams();

    const [currentOrder, setCurrentOrder] = useState([])
    const [orderStatus, setOrderStatus] = useState([])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setOrderStatus(values => ({...values, [name]: value}));
    }

    const getOrder = () => {
        services.getId(`/orders/${id}`)
        .then(response => {
            console.log(response.data.message)
            setCurrentOrder(response.data.message)
        })
        .catch(error => {
            console.error(error)
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
    }

    const UpdateOrder= () => {
        services.update(`/orders/update/${id}`, orderStatus)
          .then((res) => {
            console.log(res)
        }).catch((error) => {
            console.error(error)
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
      }

    useEffect (() => {
        getOrder();
    }, []);

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
                        <h1>Atualizar Pedido</h1>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Pedido</th>
                                    <th>Tablet</th>
                                    <th>Pedido</th>
                                    <th>Quantidade</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>   
                                {currentOrder.map((order,key) => 
                                    <tr key={key}>
                                        <td>{order.orderId}</td>
                                        <td>{order.tabletId}</td>
                                        <td>{order.recipeName}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.status}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        <Form className="form-itens" onSubmit={UpdateOrder}>
                        <Form.Control as="select" 
                                    name="status" 
                                    onChange={handleChange}>
                                    <option value="">Indique o novo status</option>
                                    <option value="cancelado">Cancelado</option>
                                    <option value="entregue">Entregue</option>
                                    <option value="preparo">Em preparo</option>
                        </Form.Control>
                        <Button className="form-submit" variant="primary" type="submit">
                            Atualizar
                        </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    </>
    )
}