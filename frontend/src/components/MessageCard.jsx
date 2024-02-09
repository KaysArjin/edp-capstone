import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const MessageCard = ({username, handleUsername}) => {
  const [message, setMessage] = useState(null);
  console.log(username)

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
        
        console.log(data)
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
            <CardTitle>Message from {username}</CardTitle>
            <CardText>{message[0].messages[0][2]}</CardText>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default MessageCard;