const Twit = require("twit");
const config = require("./config.js");
//console.log(config.twitterApp);

const T = new Twit(config.twitterApp);
const my_user_name = config.userName;
const timeout = 1000 * 60 * 5; // timeout to send the message 5 min

const AutoDM = () => {
  // const stream = T.stream("user");
  var postername = '@'+config.userName;
  var stream = T.stream('statuses/filter', { track: postername });
  console.log("Start Sending Auto Direct Message 🚀🚀🚀");
  stream.on("follow", SendMessage);
};

const SendMessage = user => {
  const { screen_name, name } = user.source;

  const obj = {
    screen_name,
    text: GenerateMessage(name)
  };
  console.log(obj);
  // the follow stream track if I follow author person too.
  if (screen_name != my_user_name) {
    console.log(" 🎉🎉🎉🎉 New Follower  🎉🎉🎉🎉🎉 ");
    setTimeout(() => {
      T.post("direct_messages/new", obj)
        .catch(err => {
          console.error("error", err.stack);
        })
        .then(result => {
          console.log(`Message sent successfully To  ${screen_name}  💪💪`);
        });
    }, timeout);
  }
};
const GenerateMessage = name => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const d = new Date();
  const dayName = days[d.getDay()];
  return `Hi ${name} Thanks for .... \n Happy ${dayName} 😊😊 `; // your message
};

module.exports = AutoDM;
