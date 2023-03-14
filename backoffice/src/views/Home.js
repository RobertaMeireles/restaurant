import React from 'react'
import Header from '../components/Header'
import SiderBar from '../components/SideBar'
import Card from 'react-bootstrap/Card'
import { AiFillHeart } from "react-icons/ai";

const Home = () => {
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
                            <h1 >Bem-vindo</h1>
                            <Card.Text className="mt-3">Projeto desenvolvido por Roberta Meireles da Silva. <AiFillHeart/></Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Home;