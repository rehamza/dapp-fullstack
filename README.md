# dapp-fullstack
this is simple full stack app built on node js , express , telegram bot , and web 3 with etherium


# Project Setup Instruction with docker:
1. you should have installed docker
2. dapp-fullstack directory run "docker-compose up --build"
    ensure backend and frontend url
    backend: http://localhost:8000   page will display:  "Hello World!"
    frontend: http://localhost:3000  page will display welcome page

3. if url are working fine then you have login and registration on welcome page press the registration button and create new user it will redirect to profile page 
  you have 2 options "connect" and "logout" to connect with metamask wallet press connect(ensure you brower install the metamask and account setup)
4. when you click on connect you may have acknowledge popup accept it and in under wallet section your account and balance will display and you can also disconnect the wallet
5. For the telegram bot API we cannot directly send data on http local so we need ngrok setup ngrok on local
    and then use "ngrok http 8000" (8000 port is your backend port)  so this command create for you https link copy the link 
    and use this endpoint from postman
     Use this endpoint http://localhost:8000/api/webhook/setWebhook (post)  (body(json): {
    "url": "https://a205-223-123-87-35.ngrok-free.app" 
})

- url is "ngrok" url
- use above endpoint to set webhook in telegram bot which send you a data in this url and save in data table in database

6. this is optional endpoint you can send message to bot for testing
you can use send message endpoint to send message this will endpoint: http://localhost:8000/api/webhook/sendMessage  (post)  (body(json): {
    "chatId": "6715882376",
    "text": "this is test message"
})
text: text is any
chat id is rquired you can get from db 

7. telegram is off in someplace if telegram is off in your region you need to setup "VPN"

8. I added envs but if you want to add your envs for docker you need to add envs in env.sample for both frontend and backend app in their directory



# Project Setup Instruction Manual:

1. Need to install postgresql on your local system
2. For Backend application: Move to "backend" directory 
    - npm install
    - npm run dev

3. For Frontend application: Move to "frontend-app" directory 
    - npm install
    - npm run dev
4. I added my envs but you can also add you envs in .env 

5. the rest of steps are same for wallet connect and telegram bot API



# Extra and optional instruction:

- if you found any error like dapp database not exist you can add manually
for the docker use these
### Enter the postgres container
docker exec -it postgres bash

### Connect to the postgres instance using psql (if you are following the manual instruction you can add directly)
psql -U postgres

### Inside the psql shell, create the 'dapp' database
CREATE DATABASE dapp;

### Exit psql and the container
\q
exit
