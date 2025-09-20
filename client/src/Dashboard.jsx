import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, InputGroup } from 'react-bootstrap';

function Dashboard() {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (phone) {
      navigate(`/member/${phone}`);
    }
  };

  return (
    <Card>
      <Card.Header as="h2">Member Search</Card.Header>
      <Card.Body>
        <Card.Text>Enter a member's phone number to view their details and history.</Card.Text>
        <Form onSubmit={handleSearch}>
          <InputGroup>
            <Form.Control 
              type="search"
              placeholder="Enter 10-digit phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button type="submit" variant="primary">Search</Button>
          </InputGroup>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Dashboard;