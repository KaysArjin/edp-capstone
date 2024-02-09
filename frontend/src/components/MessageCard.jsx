import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const MessageCard = ({username, handleUsername}) => {
    const [message, setMessage] = useState(null);
    console.log(username)
    let message_lst
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
        if (data.message_lst == []){
            setMessage(['Nothing to display'])
        }
        else {
        setMessage(data.message_lst);
        }
        console.log(message)
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessage();
    
  }, []);

  return (
    // <div></div>
    <div>
    {message.message_lst.map((messages) => (
        <Card key={messages}>
    
          {/* <CardBody>
            <CardTitle>Messages from {username}</CardTitle>
            {messages.map((message, index) => (
              <CardText key={index}>{message}</CardText>
            ))}
          </CardBody> */}
        </Card>
      ))}
    </div>
  );
};

export default MessageCard;