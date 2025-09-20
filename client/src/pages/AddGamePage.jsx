import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Card, Form, Button, Spinner, Row, Col } from 'react-bootstrap';
import api from '../api/axiosConfig';

function AddGamePage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [minPlayers, setMinPlayers] = useState(1);
  const [multipleAllowed, setMultipleAllowed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await api.post(
        '/games',
        { name, price: Number(price), description, minPlayers: Number(minPlayers), multipleAllowed }
      );
      toast.success(`Game '${name}' added successfully!`);
      setName(''); setPrice(''); setDescription(''); setMinPlayers(1); setMultipleAllowed(true);
    } catch (error) {
      toast.error('Error: Could not add game.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <Card.Header as="h2">Add New Game</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Game Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price (₹)</Form.Label>
            <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} required disabled={isLoading} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} disabled={isLoading} />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Min Players</Form.Label>
                <Form.Control type="number" value={minPlayers} onChange={(e) => setMinPlayers(e.target.value)} required disabled={isLoading} />
              </Form.Group>
            </Col>
            <Col className="d-flex align-items-center">
              <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Multiple Players Allowed" checked={multipleAllowed} onChange={(e) => setMultipleAllowed(e.target.checked)} disabled={isLoading} />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner as="span" animation="border" size="sm" /> : 'Add Game'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddGamePage;