import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Table, Spinner, Card, Button } from 'react-bootstrap';
import api from '../api/axiosConfig'; // <-- CRITICAL: Import 'api', not 'axios'

function ManageGamesPage() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      try {
        // --- CRITICAL: Use 'api.get', not 'axios.get' ---
        const response = await api.get('/games'); 
        setGames(response.data);
      } catch (error) {
        toast.error("Failed to fetch games. Your session may have expired.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGames();
  }, []);

  if (isLoading) {
    return <div className="text-center"><Spinner animation="border" /> Loading Games...</div>;
  }

  return (
    <Card>
      <Card.Header as="h2">Manage Games</Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Min Players</th>
              <th>Multiple Allowed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td>{game.name}</td>
                <td>₹{game.price.toFixed(2)}</td>
                <td>{game.minPlayers}</td>
                <td>{game.multipleAllowed ? 'Yes' : 'No'}</td>
                <td><Button variant="outline-primary" size="sm">Edit</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default ManageGamesPage;