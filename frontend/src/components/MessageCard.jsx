import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const MessageCard = ({ sender }) => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        // Fetch message from the backend API based on sender's id
        console.log(sender)
        const response = await fetch(`/api/message/${sender}`);
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
  }, [sender]);
 // [sender] is dependency array, which is the "independent variable" that causes react to rerender
  return (
    <div>
      {message && (
        <Card>
          <CardBody>
            <CardTitle>Message from {message.sender}</CardTitle>
            <CardText>{message.content}</CardText>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default MessageCard;