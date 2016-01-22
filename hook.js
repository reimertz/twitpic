module['exports'] = function datastoreExample (hook) {
  var res = hook.res,
      req = hook.req,
      store = hook.datastore;

    store.get('twitterKeyzzz', function(err, result){
    var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

    });
  });
};
