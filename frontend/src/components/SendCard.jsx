import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";

const SendCard = ({username, handleUsername}) => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/message/${username}/${userId}/false`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({'message': message}),
      });

      const j_response = await response.json();
      console.log(j_response)

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setMessage('');
      navigate('/landingpage')
    } catch (error) {
      setError("please enter a valid recipient");
    } finally {
      setLoading(false);
    }

    
  };

  return (
    <div>
      <Card>
        <CardBody>
          
          <div className="mb-3">
            
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={handleUserIdChange}
              className="form-control"
              placeholder="Enter recipient user ID"
            />
          </div>
          <textarea
            rows={3}
            value={message}
            onChange={handleMessageChange}
            className="form-control mb-3"
            placeholder="Type your message here..."
          />
          {error && <p className="text-danger">{error}</p>}
          <Button onClick={sendMessage} disabled={loading} color="primary">
            {loading ? 'Sending...' : 'Send'}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default SendCard;
