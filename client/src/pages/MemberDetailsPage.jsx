import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card, Nav, Table, Button, Spinner, Alert } from 'react-bootstrap';
import api from '../api/axiosConfig';

function MemberDetailsPage() {
  const { phone } = useParams();
  const [memberDetails, setMemberDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('games');

  const fetchMemberDetails = async () => {
    setIsLoading(true);
    try {
      const response = await api.post('/members/search', { phone });
      setMemberDetails(response.data);
    } catch (err) {
      toast.error('Could not find member details.');
      setMemberDetails(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberDetails();
  }, [phone]);

  const handlePlayGame = async (gameId) => {
    setIsActionLoading(true);
    try {
      const memberId = memberDetails.member.id;
      const response = await api.post('/play', { member_id: memberId, game_id: gameId });
      toast.success(response.data);
      fetchMemberDetails(); // Refresh data
    } catch (err) {
      toast.error(err.response?.data || 'Failed to play game.');
    } finally {
      setIsActionLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center"><Spinner animation="border" /> Loading member details...</div>;
  }
  if (!memberDetails) {
    return <Alert variant="warning">No member data to display. Please try another search.</Alert>;
  }

  return (
    <Card>
      <Card.Header as="h2">Member Details</Card.Header>
      <Card.Body>
        <p><strong>Name:</strong> {memberDetails.member.name}</p>
        <p><strong>Phone:</strong> {memberDetails.member.phone}</p>
        <p><strong>Balance:</strong> ₹{memberDetails.member.balance.toFixed(2)}</p>

        <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
          <Nav.Item><Nav.Link eventKey="games">Games</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="recharges">Recharge History</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="played">Played Games</Nav.Link></Nav.Item>
        </Nav>

        {/* --- ADDED CHECKS TO PREVENT .map() ERROR --- */}
        {activeTab === 'games' && (
          <Table striped bordered hover responsive>
            <thead><tr><th>Name</th><th>Price</th><th>Action</th></tr></thead>
            <tbody>
              {(memberDetails.games || []).map(game => (
                <tr key={game.id}>
                  <td>{game.name}</td><td>₹{game.price.toFixed(2)}</td><td>
                    <Button onClick={() => handlePlayGame(game.id)} disabled={isActionLoading} size="sm">
                      {isActionLoading ? '...' : 'Play Game'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {activeTab === 'recharges' && (
          <Table striped bordered hover responsive>
            <thead><tr><th>Date/Time</th><th>Amount</th></tr></thead>
            <tbody>
              {(memberDetails.rechargeHistory || []).map(r => <tr key={r.id}><td>{new Date(r.dateTime).toLocaleString()}</td><td>₹{r.amount.toFixed(2)}</td></tr>)}
            </tbody>
          </Table>
        )}
        {activeTab === 'played' && (
          <Table striped bordered hover responsive>
            <thead><tr><th>Date/Time</th><th>Game</th><th>Amount</th></tr></thead>
            <tbody>
              {(memberDetails.playedHistory || []).map(p => <tr key={p.id}><td>{new Date(p.dateTime).toLocaleString()}</td><td>{p.gameName}</td><td>₹{p.amount.toFixed(2)}</td></tr>)}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
}

export default MemberDetailsPage;