import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaAngleLeft } from 'react-icons/fa';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

const Notification = () => {
  return (
    <div>
        <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <Link to='/home'>            <FaAngleLeft/>            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
        <br></br>
 <Container fluid style={{margin:'auto',width:'80%'}}>
      <Row>
        <Col sm={4}>
        <div className="d-grid gap-2">
      <Button variant="primary" size="lg">
        Daily Reminder
      </Button>
      <Button variant="primary" size="lg">
        Weekly Streak
      </Button>
      <Button variant="primary" size="lg">
        Streaks Of The Month
      </Button>
      <Button variant="primary" size="lg">
        Yearly Recap
      </Button>
      <Button variant="primary" size="lg">
        Starred
      </Button>
    </div>
        </Col>
        <Col sm={8} style={{padding:'8px'}}>
            <h1>Unread</h1>
            <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Notofication<sub>(1)</sub></Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          <Button style={{float:"right"}}>Mark as read</Button>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Notification<sub>(2)</sub></Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          <Button style={{float:"right"}}>Mark as read</Button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
            <h1>Read</h1>
            <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
     <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Notification</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          <Button style={{float:"right"}}>Close</Button>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Notification</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          <Button style={{float:"right"}}>Close</Button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
        </Col>
      </Row>
      </Container>
          </div>
  );
};

export default Notification;
