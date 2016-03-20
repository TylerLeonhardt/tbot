# tbot

I downloaded Telegram and thought I'd give this whole bot thing a try... within 10-15 min I had the initial `/pugme` command completely operational.

Telegram's API is A LOT of fun :)

## What's in the bot?

Tbot can understand several commands:
`/wowme` - such picture. wow. send doge.
`/pugme` - get you a pug (optionally specify how many pugs you want: i.e.  `/pugme 5`)

## Want to run the bot?

It's pretty simple to get up and running but you will need a few things first...

### Dependencies
I built a keys.json file that looks like this saved in the root of the directory:
```json
{
  "Telegram":{
    "token":"SEE #1 BELOW"
  },
  "Bing":{
    "accKey":"SEE #2 BELOW"
  }
}
```
1. You'll need a token for your bot for use with the Telegram API. Go talk to [this guy](https://telegram.me/botfather). He'll help you get one.
2. You'll need a Microsoft "account key". First, sign up for the Bing Search API [here](https://datamarket.azure.com/dataset/bing/search). Then go to "My Account" and grab the "Primary Account Key".

Lastly, open up a terminal in the root directory and run:

`npm install`

Good work! You've got all the dependencies. Lets give it a shot!

### Lets run it

I wrote this code in ES6 and at the time I made this, Node.js needed a special flag to run this. To run the bot simply open up a terminal in the root directory and run:

`npm start`

Now start a chat in Telegram with your bot and type:

`/pugme`
`/wowme`
`/pugme 5`

Hopefully it worked for you! Enjoy!
