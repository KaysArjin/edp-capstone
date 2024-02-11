import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { MapMessages } from './MapMessages';

const MessageCard = ({ username, handleUsername }) => {

  const [messageArray, setMessageArray] = useState([]);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        // Fetch message from the backend API based on username
        console.log(username)

        const response = fetch(`/api/message/${username}`).then(
          (response) => {
            if (!response.ok) {
              throw new Error('Failed to fetch message');
            } else {
              response.json().then((data) => {
                setMessageArray(data)
              })
            }
          }
        )
      } catch (error) {
      }
    };
    fetchMessage()


  }, [])

  console.log("in drawing");
  console.log(messageArray);

  return (
    <div>

      <div>

        {messageArray.length == 0 || messageArray[0] == "" ? <h4>No Data</h4> :
          <div>
            <h3> Here are the messages for {`${username}`}</h3>
            {
              messageArray.map((message_thread) => {
                return (
                  <Card key={message_thread}>
                    <CardBody>
                      {message_thread.messages.map((msg) => {
                        {
                          return (
                            <div>
                              < CardText > <b>From:</b> {msg[0]} </CardText>
                              < CardText > <b>Sentiment:</b> {msg[1]} </CardText>
                              < CardText > <b>Message: </b>{msg[2]} </CardText>

                              <br />
                            </div>
                          )
                        }
                        {//return (<h3>{msg}</h3>);
                        }
                      })}
                    </CardBody>
                  </Card>
                )
              })
            }
          </div>
        }

      </div>
    </div >
  );
};

export default MessageCard;