import React from 'react';
import './ResponsiveCSS/homeResponsive.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaCalendarAlt, FaUserAlt, FaPaperclip, FaImage,FaMicrophone,FaVideo,FaFileAudio ,FaBell } from 'react-icons/fa';
import Carousel from 'react-bootstrap/Carousel';
import { useState, useRef } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import ButtonGroup from 'react-bootstrap/ButtonGroup';



const Home = () => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`Selected file: ${file.name}`);
      // You can add further logic here to handle the selected file
    }
  };
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to='/entry'>                        <Navbar.Brand href="#"><FaCalendarAlt/></Navbar.Brand>            </Link>
                        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Keyword"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>

          </Nav>
                      <Nav.Link href="#action1"><FaUserAlt/>&nbsp;Username</Nav.Link><br></br><br></br>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <br></br>
    <br></br>
    <br></br>
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
          <h5>Todays Entry</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Item>
      <Carousel.Item>
          <h5>Yesterdays Entry</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Item>
      <Carousel.Item>
          <h5>Day before Yesterday</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Item>
    </Carousel>
    <br></br>
    <br></br>
    <>
      <Button variant="success" ref={target} onClick={() => setShow(!show)} id='attachment'>
        <FaPaperclip/>&nbsp;Attachment
      </Button>
      <Overlay target={target.current} show={show} placement="right">
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            style={{
              position: 'absolute',
              backgroundColor: 'transparent',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
          >
            <ButtonGroup size="sm">
        <Button  onClick={handleButtonClick}><FaImage/></Button>
        <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
              <Button onClick={handleButtonClick}><FaFileAudio/></Button>
              <input
        type="file"
        id="fileInput"
        accept="audio/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
        <Button><FaMicrophone/></Button>
        <Button onClick={handleButtonClick}><FaVideo/></Button>
        <input
        type="file"
        id="fileInput"
        accept="vedio/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      </ButtonGroup>
          </div>
        )}
      </Overlay>
    </>
    <br></br>
    <br></br>
    <Link to='/notification'><Button variant='success' id='notification'><FaBell/>&nbsp;Notification</Button></Link>
    </div>
  );
};

export default Home;
