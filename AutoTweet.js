const Twit = require("twit");
const config = require("./config.js");
//console.log(config.twitterApp);

const T = new Twit(config.twitterApp);
const my_user_name = config.userName;
const timeout = 1000 * 60 * 5; // timeout to send the message 5 min

const AutoTweet = () => {
  const tweetStatus = { 
      status: "Test from Node.js" 
    }
  T.post('statuses/update', tweetStatus, tweetProcess);
  console.log("Start Tweet");
};

function tweetProcess (err, data, response) {
    if(err) {
        console.log("Something is wrong");
    } else{
        console.log("Tweeted");
    }
}
module.exports = AutoTweet;