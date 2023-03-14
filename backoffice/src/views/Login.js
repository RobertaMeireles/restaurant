import React, { useState } from "react"
import AuthService from "../services/auth.service"
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const Login = () => {

  const [submitted, setSubmitted] = useState(false)
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [regexMessage, setRegexMessage] = useState(true)


  const checkLogin = (e) => {
    e.preventDefault();
    if (username && password){
      setSubmitted(true)
      handleLogin()
    } 
    setSubmitted(true)

  }

  const handleLogin = () => {

      AuthService.login(username, password).then(
        () => {
            window.location.href = "/home"
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSubmitted(true)
          setRegexMessage(false)
        }
      )
    }

    return (
        <>
            <Card className="form-user">  
                <Card.Body >
                    <h1>Login</h1>
                    <Form onSubmit={checkLogin}>

                        <Form.Group>
                            <Form.Control type="text" name="email" placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
                        </Form.Group>
                        <div className="error-div">
                            {submitted && !username && <span className='erro-contact'>Incorret E-mail</span>} 
                        </div>

                        <Form.Group>
                            <Form.Control type="text" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        <div className="error-div">
                            {submitted && !password && <span className='erro-contact'>Incorret Password</span>} 
                        </div>

                        <Button variant="primary" type="submit">Submit</Button>
                        <div className="error-back">
                            {submitted && !regexMessage && <span className='erro-contact'>{message}</span>} 
                        </div>
                
                       <div className="link">
                         <p><a href="/register">Sign Up</a></p>
                       </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default Login
