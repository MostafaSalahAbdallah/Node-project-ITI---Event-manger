import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">Event Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Register</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/Events">Events</Nav.Link> 

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}
