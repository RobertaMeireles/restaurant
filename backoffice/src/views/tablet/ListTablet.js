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

export default function ListTablet() {

    const navigate = useNavigate()

    const [tablets, setUsers] = useState([])

   const getTablets = () => {
        services.getAll(`/tablets`)
        .then(response => {
            setUsers(response.data.message)
        })
        .catch(error => {
            console.error(error);
            alert(`Um problema ocorreu. Tente mais tarde.`)
            navigate('/home')
        })
    }

    const createTablet = () => {
        services.create('/tablets/add', 
            {
                restaurantId: 1
            })
        .then((res) => {
            if (res) {
                navigate('/home')
                alert(`Tablet criado.`)
            }
        }).catch((error) => {
            console.error(error)
            navigate('/home')
            alert(`Um problema ocorreu. Tente mais tarde.`)
        })
    }

    useEffect (() => {
        if(services.getCurrentUser()) {
            getTablets();
        }
        else {
            navigate('/home')
        }
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
                        <h1>Tablet</h1>
                        <Button variant="primary" onClick={() => createTablet()}>Criar</Button>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Tablet</th>
                                    <th>Deletar</th>
                                </tr>
                            </thead>
                            <tbody>   
                                {tablets.map((tablet,key) => 
                                    <tr key={key}>
                                        <td>{tablet.id}</td>
                                        <td>
                                            <a href={'/tablet/deletar/'+ tablet.id} className="delete" ><AiTwotoneDelete /></a>
                                        </td>
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