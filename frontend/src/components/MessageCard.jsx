import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const MessageCard = ({ username, handleUsername }) => {
  const [message, setMessage] = useState(null);
  console.log(username)

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        // Fetch message from the backend API based on username
        console.log("username")
        console.log(username)

        const response = await fetch(`/api/message/${username}`);

        if (!response.ok) {
          throw new Error('Failed to fetch message');
        }
        const data = await response.json();

        console.log("in use effect")
        console.log(data)
        setMessage(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessage();
    console.log("mapping!!!")
    message.map((elem) => {
      console.log(elem)
    })
  }, []);

  return (
    <div>

      {
        



        /*
        message.map((elem) => {
          <Card key={index}>
            <CardBody>
              {
                elem.map((val) => {
                  val.messages.map((msg) => {
                    <CardText>{msg}</CardText>
                  })

                }
                )}
            </CardBody>
          </Card>
        })//*/
      }


    </div>
  );
};

export default MessageCard;