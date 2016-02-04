var rp = require('request-promise'),
    Twitter = require('twitter'),
    fs = require('fs'),

    IMAGE_URL = "https://rawgit.com/reimertz/twitpic/master/jpgs/";
    rp.defaults({ encoding: null });




  function newImage(){
    var filename = Math.floor(Math.random() * 99) ;

    var client = new Twitter({
      consumer_key: 'Ctv0HshjsZoFAk1Aao59e0L2Y',
      consumer_secret: 'toPlKpjejGj9dKza51YbPOvjyPia3JjDX5RvBbSHjYe5lP0XlX',
      access_token_key: '79005145-yZUxrBZfwtG8O7ZLHY2yO9XYY6S0zrNj67gO8uhHl',
      access_token_secret: '8TCW1wIMcVesyGo2FzKmfzJbD9oAOKPAM5zSCLAi6osoK'
    });


    var imgContent = fs.readFileSync('./jpgs/'  + 10 + '.jpeg');
    var b64 = new Buffer(imgContent, 'binary').toString('base64');

    var opts = {
      banner: b64
    };

    console.log(b64);

    client.post('account/update_profile_banner', opts, function(error, tweet, response){
      console.log('image ' + 10);
    })
  }

newImage();