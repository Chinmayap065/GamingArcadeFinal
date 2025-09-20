import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Card, Form, Button, Spinner, Table } from 'react-bootstrap';
import api from '../api/axiosConfig';

function CollectionsPage() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [collectionData, setCollectionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleFetchCollection = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setCollectionData(null);
    try {
      const response = await api.get(`/collection/${date}`);
      setCollectionData(response.data);
    } catch (error) {
      toast.error('Failed to fetch collection data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <Card.Header as="h2">Daily Collections</Card.Header>
      <Card.Body>
        <Form onSubmit={handleFetchCollection}>
          <Form.Group className="mb-3">
            <Form.Label>Select Date</Form.Label>
            <InputGroup>
                <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} disabled={isLoading} />
                <Button type="submit" variant="primary" disabled={isLoading}>
                    {isLoading ? <Spinner as="span" animation="border" size="sm" /> : 'Search'}
                </Button>
            </InputGroup>
          </Form.Group>
        </Form>

        {isLoading && <div className="text-center mt-3"><Spinner animation="border" /></div>}

        {collectionData && (
          <div className="mt-4">
            <h3>Collection for {collectionData.date}</h3>
            <h4>Total: ₹{collectionData.totalCollection.toFixed(2)}</h4>
            <Table striped bordered hover responsive>
              <thead><tr><th>Type</th><th>Member Name</th><th>Amount</th><th>Time</th></tr></thead>
              <tbody>
                {collectionData.activities.map((activity, index) => (
                  <tr key={index}>
                    <td>{activity.type}</td>
                    <td>{activity.memberName}</td>
                    <td>₹{activity.amount.toFixed(2)}</td>
                    <td>{new Date(activity.dateTime).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
// Add this import at the top
import { InputGroup } from 'react-bootstrap';
export default CollectionsPage;