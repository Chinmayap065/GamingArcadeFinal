import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Table, Spinner, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

function ManageMembersPage() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/members');
        setMembers(response.data);
      } catch (error) {
        toast.error("Failed to fetch members.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const handleRowClick = (phone) => {
    navigate(`/member/${phone}`);
  };

  if (isLoading) {
    return <div className="text-center"><Spinner animation="border" /> Loading Members...</div>;
  }

  return (
    <Card>
      <Card.Header as="h2">Manage Members</Card.Header>
      <Card.Body>
        <Card.Text>Click on any member to view their detailed history and play games.</Card.Text>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} onClick={() => handleRowClick(member.phone)} style={{ cursor: 'pointer' }}>
                <td>{member.name}</td>
                <td>{member.phone}</td>
                <td>₹{member.balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default ManageMembersPage;