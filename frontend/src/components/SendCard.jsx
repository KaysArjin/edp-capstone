import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

const SendCard = ({ senderId, anonymous }) => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      const response = await fetch(`/api/message/${sender_id}/${reciever_id}/${anonymous}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setMessage('');
    } catch (error) {
      setError(error.message);
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
