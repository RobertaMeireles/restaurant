import React from 'react'
import Card from 'react-bootstrap/Card'

const notFound = () => {
    return (
        <>
            <div className="card-flex">
                <div className = "card-div">
                    <Card>
                        <Card.Body>
                            <h1 >404 - Página não encontrada.</h1>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default notFound;