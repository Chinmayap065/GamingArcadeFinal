import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import api from '../api/axiosConfig';

function CreateMemberPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [fee, setFee] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(
        '/members',
        { name, phone, fee: Number(fee) }
      );
      toast.success(`Member '${response.data.name}' created successfully!`);
      navigate(`/member/${response.data.phone}`);
    } catch (error) {
      toast.error(error.response?.data || 'Error: Could not create member.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <Card.Header as="h2">Create New Membership</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required disabled={isLoading} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Membership Fee (₹)</Form.Label>
            <Form.Control type="number" value={fee} onChange={(e) => setFee(e.target.value)} required disabled={isLoading} />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner as="span" animation="border" size="sm" /> : 'Create Membership'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateMemberPage;