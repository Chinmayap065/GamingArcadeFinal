import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import api from '../api/axiosConfig'; // Import the central api config

function RechargePage() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // Use the central 'api' instance to make the request
      const response = await api.post(
        `/members/${phone}/recharge`,
        { amount: Number(amount) }
      );
      toast.success(`Recharged ₹${amount}. New balance for ${response.data.name} is ₹${response.data.balance.toFixed(2)}.`);
      setPhone('');
      setAmount('');
    } catch (error) {
      toast.error(error.response?.data || 'Error: Could not process recharge.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <Card.Header as="h2">Recharge Member Account</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Member Phone Number</Form.Label>
            <Form.Control type="text" value={phone} placeholder="Enter 10-digit phone number" onChange={(e) => setPhone(e.target.value)} required disabled={isLoading} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Recharge Amount (₹)</Form.Label>
            <Form.Control type="number" value={amount} placeholder="Enter amount" onChange={(e) => setAmount(e.target.value)} required disabled={isLoading} />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner as="span" animation="border" size="sm" /> : 'Recharge Account'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default RechargePage;