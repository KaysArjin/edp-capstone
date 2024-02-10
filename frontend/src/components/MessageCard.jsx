import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { MapMessages } from './MapMessages';

const MessageCard = ({ username, handleUsername }) => {

  const [messageArray, setMessageArray] = useState([]);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        // Fetch message from the backend API based on username

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

  /*
  {messageArray== [] ? <h1>loading</h1> :
            <div>
            <p>{messageArray[0].messages[0][0]}</p>
            <p>{messageArray[0].messages[0][1]}</p>
            <p>{messageArray[0].messages[0][2]}</p>
            <div>{
            }</div>
          </div>

        messageArray.map((message_thread) => {
          console.log(message_thread)

          message_thread.messages.map((msg) => {
            return <div className='message_container'>
              <h3>{msg[0]}</h3>
              <h4>{msg[1]}</h4>
              <h4>{msg[2]}</h4>

            </div>
          })
        })
      }
  */

  return (
    <div>
      <h3> Here are the messages for {`${username}`}</h3>
      <div>
        {messageArray.length == 0 ? <h1>loading</h1> : <div>
          <p>{messageArray[0].messages[0]}</p>
          {
            messageArray.map((message_thread) => {
              return (
                <Card>
                  <CardBody>
                    {message_thread.messages.map((msg) => {
                      { return < CardText > {msg} </CardText> }
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