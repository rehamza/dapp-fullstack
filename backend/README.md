## Getting Started

npm run dev

npm test


### migration creation 
npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string

manually run migration:  npx sequelize-cli db:migrate


## Create a Telegram Bot
Step 1: Use BotFather to Create a New Bot
•	Open Telegram and search for the BotFather.
•	Start a chat with BotFather and send the command /newbot.
•	Follow the prompts to set a name and username for your bot.
•	After creation, BotFather will provide you with a bot token.


step 2: Replace your token in env
step 3: Use this endpoint http://localhost:8000/api/webhook/setWebhook (post)  (body(json): {
    "url": "https://a205-223-123-87-35.ngrok-free.app" 
})
- url is ngrok url
- use above endpoint to set webhook in telegram bot which send you a data in this url and save in data table in database

step 4: you can use send message endpoint to send message this will endpoint: http://localhost:8000/api/webhook/sendMessage  (post)  (body(json): {
    "chatId": "6715882376",
    "text": "this is test message"
})

