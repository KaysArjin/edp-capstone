import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const MessageCard = ({username, handleUsername}) => {
  const [message, setMessage] = useState(null);
  

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        // Fetch message from the backend API based on username
        console.log(username)
        
        const response = await fetch(`/api/message/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch message');
        }
        const data = await response.json();
        setMessage(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div>
      {message && (
        <Card>
          <CardBody>
            <CardTitle>Message from {message.username}</CardTitle>
            <CardText>{message.content}</CardText>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default MessageCard;