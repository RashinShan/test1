import React from 'react';
import './ResponsiveCSS/forgetpswResponsive.css'
import Container from 'react-bootstrap/esm/Container';
import { useState } from "react";
import { Link , useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Forgetpsw = () => {
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();


    try {
      const response = await fetch('http://localhost:4000/forgetpsw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          repassword
       
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/'); 
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Error');
    }
  };
  return (
    <div id='frgtpswbody'>
      <Container>
      <Form style={{margin:'8%'}} onSubmit={handleSubmit}>
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

      <Form.Label htmlFor="inputPassword5">Re-enter Password</Form.Label>
      <Form.Control
        type="password"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
        value={repassword}
        onChange={(e) => setRePassword(e.target.value)}
      /><br></br>
              <Link to='/'><Button variant='success' type="submit">Submit</Button></Link>
    </Form>
      </Container>
    </div>
  );
};

export default Forgetpsw;
