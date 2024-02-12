import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";

const SendCard = ({ username, handleUsername }) => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [anonymous, setAnonymous] = useState(false);
  const navigate = useNavigate();

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleCheckboxChange = (e) => {
    setAnonymous(e.target.checked)
  }


  const sendMessage = async () => {
    setLoading(true);
    setError(null);

    console.log(anonymous)
    let anon = anonymous.toString
    try {
      const response = await fetch(`/api/message/${username}/${userId}/${anonymous.toString()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ 'message': message }),
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
            />
          </div>
          <input
            type="checkbox"
            id="anonymousCheck"
            value={userId}
            onChange={handleCheckboxChange}
            placeholder="Enter recipient user ID"
          />
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
