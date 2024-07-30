import React from 'react';
import './ResponsiveCSS/signupresponsive.css'
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { FaGoogle } from 'react-icons/fa';
import { useState } from "react";
import { Link , useNavigate} from 'react-router-dom';


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== repassword) {
      alert('Passwords do not match');
      return;
    }


    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          repassword
       
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/otp'); 
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Error');
    }
  };

  return (
    <div id="signupbody">
      <Container>
      <Form style={{margin:'8%'}} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label htmlFor="inputPassword5">Password</Form.Label>
      <Form.Control
        type="password"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Form.Text id="passwordHelpBlock" muted>
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={repassword} onChange={(e) => setRePassword(e.target.value)}/>
      </Form.Group>
      
      <Link to='/otp'><Button type="submit">Sign Up</Button></Link><br></br>
      <FaGoogle /><br></br>
      <Link to='/'><Button variant='danger'>Cancel </Button></Link>

    </Form>
      </Container>
    </div>
  );
};

export default Signup;
