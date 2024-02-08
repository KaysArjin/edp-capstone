# Backend port: 3500

## Authentication Prompt: 
### Login: 
Send username to backend
    GET Route: /api/authentication/login/[user_id] 
    Server: 
        Checks to see if user is in db
        Sends back user, messages threads

### Register: 
Send username to backend
    POST Route: /api/authentication/register/[user_id] 
    Server: 
        Check if username already exists
        Respond with 401 unauthorized
        create new document in db with user_id, messages threads (empty) 

## Messaging system: 
Messages are stored with a message_id, sender_id, recipient_id, message contents. They will send back this information as well. 

### Send message: 
    POST Route: /api/message/[sender_id]/[recipient_id]/[anonymous]
    if anonymous is true, sender_id is -1
    will return 400 bad request if recipient_do

### Reply to message: 
    PUT Route: /api/message/[sender_id]/[recipient_id]/[message_id]
    Returns the updated message thread... 

### Get messages: 
    GET Route: /api/message/[sender]
    Returns all message_threads

### Close message thread: 
    PUT Route: /api/message/remove/[manager_id]/[user_id]/[message_id] 

### Navigation: 
Login page 
Message/Homepage 


## Mongo start up instruction: 
open a cmd prompt
cd C:\MongoDB\Server\6.0\bin 
mongod {enter}

open new cmd prompt 
cd C:\Software\mongosh\mongosh-1.8.0-win32-x64\bin
mongosh {enter}


in a cmd prompt 
mongoimport --db user_messages --collection users --file message_documents.json --jsonArray

mongoimport --db user_messages --collection messages --file message_documents.json --jsonArray