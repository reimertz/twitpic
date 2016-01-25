module['exports'] = function datastoreExample (hook) {
  var request = require('request'),
      Twitter = require('twitter'),
      store = hook.datastore,
      IMAGE_URL = "http://rawgit.com/reimertz/twitpic/master/jpgs/",
      INDEX = Math.floor(Math.random() * 99);

  function getBinaryValueFromInt(n) {
    var binaryString = (n).toString(2);
    return '0000000'.substring(0, 7 - binaryString.length) + binaryString;
  }

  store.get('keysBanner', function(err, twitterKeys){
    var client = new Twitter({
      consumer_key: twitterKeys.consumer_key,
      consumer_secret: twitterKeys.consumer_secret,
      access_token_key: twitterKeys.access_token_key,
      access_token_secret: twitterKeys.access_token_secret
    });

    var opts = {
      uri: IMAGE_URL + INDEX + '.jpeg',
      encoding: null
    }

    request.get(opts, function(err, res, body){
      client.post('account/update_profile_banner', {
        banner: new Buffer(body, 'binary').toString('base64')
      }, function(error, tweet, response){});
    });
  });

  var bannerColors = ["#767676","#F7F7F7","#717171","#BF4A4D","#27A9D9","#C93929","#5644BC","#385359","#1A1A1A","#47ABC0","#5B97C6","#30A3CE","#2497DE","#C44845","#4769D0","#4765D6","#3852CB","#C03FB0","#FE04FC","#F604FB","#15046E","#17036F","#1B1CE6","#3D3AB5","#FD0334","#BC6043","#EF190F","#1C9EDF","#D85F20","#37952E","#E1281E","#D72823","#23A7DC","#25B5D6","#3C99CF","#6094C9","#6D91C2","#8D7A3D","#7288B0","#5B73BE","#5064BB","#678F34","#A28422","#B74DC6","#C2813D","#23ACE3","#279FDA","#269EDE","#4D95E3","#1AC6E7","#1AA7DE","#3C5AC8","#A43EC2","#BA3FB0","#4756C4","#C75936","#C25C37","#30A5D2","#C45D38","#4F46C5","#4C58C8","#C73535","#C83635","#3C52C2","#3753CB","#CE2D39","#4250C7","#F814C9","#CF4757","#E15E28","#EF0F0F","#101010","#662519","#8E1514","#9B2117","#DA5E19","#D7631C","#3198E2","#2C96DB","#22AADB","#249EDB","#6E8B25","#748D2A","#6A8F2F","#2E8C2D","#3A3A3A","#3967C5","#C6397C","#C45EB9","#C75EC7","#3765C3","#C359C8","#C471C4","#4A8E3B","#B659BC","#3D8796","#3D8895","#728778","#585858","#5F5F5F"]

  store.get('keysProfile', function(err, twitterKeys){
    if(err) return hook.res.end(err);

    var client = new Twitter({
      consumer_key: twitterKeys.consumer_key,
      consumer_secret: twitterKeys.consumer_secret,
      access_token_key: twitterKeys.access_token_key,
      access_token_secret: twitterKeys.access_token_secret
    });

    var options = {
      name: bannerColors[INDEX] + '-' +  getBinaryValueFromInt(INDEX),
      profile_link_color: bannerColors[INDEX].replace('#',''),
    }

    client.post('account/update_profile', options, function(error, tweet, response){});
  });
}