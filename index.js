const Twitter = require('twitter');
const Sheet = require('./sheet');
require('dotenv').config();

(async function () {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  const sheet = new Sheet();
  await sheet.load();
  const quotes = await sheet.getRows();

  const status = quotes[0].quote;

  client.post('statuses/update', { status }, function (error, tweet, response) {
    if (error) throw error;
    console.log(tweet); // Tweet body.
  });

  await quotes[0].delete();
})();
