"use strict";

//shh it's a secret
const keys = require('./keys');

//used to get stream of images
const request = require('request');

//TelegramBot setup - https://github.com/yagop/node-telegram-bot-api
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(keys.Telegram.token, {polling: true});

//Bing setup for image search - https://www.npmjs.com/package/node-bing-api
const Bing = require('node-bing-api')({ accKey: keys.Bing.accKey });

//Only accepted image formats for Telegram
const EXTENSION_CONSTANTS = ['.jpg', '.gif', '.png', '.tif', '.bmp'];

//Set timout for requests
const TIMEOUT = 4000;

// `/pugme [optional:number]` command that sends pictures of pugs back to Telegram
bot.onText(/\/pugme *([0-9]*)/, (msg, match) => {
  let fromId = msg.chat.id;
  Bing.images("pug", {
    imageFilters: {
      size: 'Medium'
    }
  }, (error, res, body) => {

    //if they specified a number of pugs
    if(match[1]){
      //filters out the bad file extensions
      let goodImages = body.d.results.filter(item => {
        let extension = item.MediaUrl.substring(item.MediaUrl.length-4);
        if(EXTENSION_CONSTANTS.indexOf(extension) != -1){
          return true;
        }
        return false;
      });

      //gets reandom images and sends them to Telegram
      getRandomValues(goodImages, parseInt(match[1])).forEach(item => {
        bot.sendPhoto(fromId, request(item.MediaUrl,{timeout:TIMEOUT}), {caption: 'Pugs not drugs <3'})
           .catch((e) => (bot.sendMessage(fromId, "One of the images was so cute, I had an issue retrieving it!")));
      });
    }else{

      //sends a random photo. If it doesn't have the correct file extension, try another random photo
      //NOTE: This could be a tad more efficiant because `getRandomArbitrary` could return a value already looked at
      // however, the performance difference shouldn't be noticable considering Telegram supports the most used file extensions
      let photo = body.d.results[Math.round(getRandomArbitrary(0,body.d.results.length-1))].MediaUrl;
      let extension = photo.substring(photo.length-4);
      while(EXTENSION_CONSTANTS.indexOf(extension) == -1){
        photo = body.d.results[Math.round(getRandomArbitrary(0,body.d.results.length-1))].MediaUrl;
        extension = photo.substring(photo.length-4);
      }
      bot.sendPhoto(fromId, request(photo,{timeout:TIMEOUT}), {caption: 'Pugs not drugs <3'})
         .catch((e) => (bot.sendMessage(fromId, "One of the images was so cute, I had an issue retrieving it!")));
    }
  });
});

bot.onText(/\/wowme/, (msg, match) => {
  let fromId = msg.chat.id;
  Bing.images("doge", {
    imageFilters: {
      size: 'Medium'
    }
  }, (error, res, body) => {
    //sends a random photo. If it doesn't have the correct file extension, try another random photo
    //NOTE: This could be a tad more efficiant because `getRandomArbitrary` could return a value already looked at
    // however, the performance difference shouldn't be noticable considering Telegram supports the most used file extensions
    let photo = body.d.results[Math.round(getRandomArbitrary(0,body.d.results.length-1))].MediaUrl;
    let extension = photo.substring(photo.length-4);
    while(EXTENSION_CONSTANTS.indexOf(extension) == -1){
      photo = body.d.results[Math.round(getRandomArbitrary(0,body.d.results.length-1))].MediaUrl;
      extension = photo.substring(photo.length-4);
    }
    bot.sendPhoto(fromId, request(photo, {timeout:TIMEOUT}), {caption: 'such pic. wow.'})
       .catch((e) => (bot.sendMessage(fromId, "One of the images was not wow. I had an issue retrieving it!")));
  });
});


//wow
bot.onText(/.*doge.*/, (msg, match) => {
  let fromId = msg.chat.id;
  bot.sendMessage(fromId, "wow");
});

//*** HELPERS ***//

//Used to get a random index in an array
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

//Used to get an array of n random values in an array
function getRandomValues(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        return arr;
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
}
