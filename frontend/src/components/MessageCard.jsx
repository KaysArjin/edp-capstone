import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const MessageCard = ({ userId }) => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        // Fetch message from the backend API based on userId
        const response = await fetch(`/api/messages/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch message');
        }
        const data = await response.json();
        setMessage(data);
      } catch (error) {
        console.error(error);
        // Handle errors, display error message or retry fetching
      }
    };

    fetchMessage();
  }, [userId]);

  return (
    <div>
      {message && (
        <Card>
          <CardBody>
            <CardTitle>Message from {message.userId}</CardTitle>
            <CardText>{message.content}</CardText>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default MessageCard;