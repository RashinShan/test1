import React from 'react';
import './ResponsiveCSS/otpresponsive.css'
import Container from 'react-bootstrap/esm/Container';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';

const OTP = () => {
  return (
    <div id='OTPbody'>
      <Container style={{margin:'8%'}}>
      <p>Chck your email<br></br>We have send your OTP</p>
      <p>Enter Your OTP</p>
      <div style={{display:'flex'}}>
      <Form.Control size="sm" type="text" style={{width:'30px'}} />&nbsp;
      <Form.Control size="sm" type="text" style={{width:'30px'}} />&nbsp;
      <Form.Control size="sm" type="text" style={{width:'30px'}} />&nbsp;
      <Form.Control size="sm" type="text" style={{width:'30px'}} />
      </div>
      <br></br>
      <Link to='/'><Button variant='success'>Submit</Button></Link>
      </Container>
            
    </div>
  );
};

export default OTP;
