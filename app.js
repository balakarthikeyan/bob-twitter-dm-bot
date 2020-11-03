const Twit = require("twit");
const config = require("./config.js");
const T = new Twit(config.twitterApp);
const my_user_name = "@" + config.userName;
const timeout = 1000 ; // * 60 * 1; // timeout to send the message 1 min

T.get('account/verify_credentials', {
    include_entities: false,
    skip_status: true,
    include_email: false
}, onAuthenticated)

function onAuthenticated(err, res) {
    if (err) {
        throw err
    }

    console.log('Authentication successful. Running bot...\r\n')

    // var stream = T.stream('statuses/filter', { track: '@balakarthikeya' })
    // stream.on('connect', (data) => { console.warn('connect') })
    // stream.on('error', (err) => { console.warn('error', err) })
  
    setInterval(followers, timeout);

    function followers() {
        console.log("Checking followers");
        var stream = T.stream('statuses/filter', { track: '@balakarthikeya' })
        stream.on('follow', onFollowed)
        stream.on('error', onError)
        stream.on('direct_message', sendMessage);

        function onFollowed(event) {
            var name = event.source.name
            var screenName = event.source.screen_name
            var response = '@' + screenName + ' Thank you for following, ' + name + '!'

            T.post('statuses/update', { status: response }, onTweeted)

            // T.post("direct_messages/new", {
            //     user_id: my_user_name, // USER_ID is parameter from directMsg object
            //     text: response
            // });

            console.log('I was followed by: ' + name + ' @' + screenName)
        }

        function onError(error) {
            throw error
        }    

        function onTweeted(err, reply) {
            if (err !== undefined) {
                console.log(err)
            } else {
                console.log('Tweeted: ' + reply.text)
            }
        }

        function sendMessage (eventMsg) {
            var msg = eventMsg.direct_message.text;
            var screenName = eventMsg.direct_message.sender.screen_name;
            var userId = eventMsg.direct_message.sender.id;
          
            // reply object
            var replyTo = { 
                user_id: userId,
                text: "Thanks for your message :)", 
                screen_name: screenName 
            };
          
            console.log(screenName + " says: " + msg );
          
            // avoid replying to yourself when the recipient is you
            if(screenName != eventMsg.direct_message.recipient_screen_name){          
                T.post("direct_messages/new", replyTo, function(err, data, response) {
                    console.info(data);
                });
            }
        }
    }
    // Search tweets with keywords
    // T.get('search/tweets', { q: 'JavaScript', count: 10 }, livetweets);
    // function livetweets(err, data) {
    //     var tweets = data.statuses;
    //     for (var i = 0; i < tweets.length; i++) {
    //       console.log(tweets[i].text);
    //     }
    // }

    // Once every hour that tweets a random number!
    // setInterval(tweeter, 60*60*1000);
    // function tweeter() {
    //     var num = Math.floor(Math.random()*100);
    //     var tweet = 'I am tweeting via the API, Random Post #' + num;
    //     T.post('statuses/update', { status: tweet }, tweeted);
    // }
}
