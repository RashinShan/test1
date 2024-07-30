import React from 'react';
import './ResponsiveCSS/loginresponsive.css'; 
import Container from 'react-bootstrap/esm/Container';
import { useState } from "react";
import { Link , useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();


    try {
      const response = await fetch('http://localhost:4000/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
       
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/home'); 
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Error');
    }
  };

  
  return (
    <div id="loginbody">
      <Container>
      <Form id="loginform" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name='email' placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
        value={password}
         onChange={(e) => setPassword(e.target.value)}
      />
      </Form.Group>
      <Form.Text className="text-muted" style={{margin:'auto', marginLeft: '40% !important'}}>
      <Link to="/forgetpsw">Forget Password</Link>
      </Form.Text><br></br><br></br>
      <Link to='/home' style={{margin:'auto', marginLeft: '42%'}}><Button variant='success' type="submit">Login</Button></Link><br></br><br></br>
      <FaGoogle style={{margin:'auto', marginLeft: '44%', fontSize:'30px'}}/><br></br><br></br>
      <Form.Text className="text-muted" style={{margin:'auto', marginLeft: '38.5%'}}>
      Don't have an account? <br></br><Link to="/signup" style={{margin:'auto', marginLeft: '42%'}}>Sign up here</Link>
      </Form.Text>
    </Form>
      </Container>
     
    </div>
  );
};

export default Login;
