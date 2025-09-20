import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function PageHeader({ onLogout }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Gaming Club</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Member Search</Nav.Link>
            <Nav.Link as={NavLink} to="/create-member">Create Member</Nav.Link>
            <Nav.Link as={NavLink} to="/recharge-member">Recharge</Nav.Link>
            <Nav.Link as={NavLink} to="/add-game">Add Game</Nav.Link>
            
            <Nav.Link as={NavLink} to="/manage-members">Manage Members</Nav.Link>
            <Nav.Link as={NavLink} to="/collections">Collections</Nav.Link>
          </Nav>
          <Nav>
            <Button variant="outline-light" onClick={onLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PageHeader;