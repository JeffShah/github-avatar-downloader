var request = require('request');
var secrets = require('./secrets')
function getRepoContributors(repoOwner, repoName, cb) {
    
  var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': "token " + secrets.GITHUB_TOKEN
      }
    };
    request(options, function(err, res, body) {
      if (res.statusCode === 200) {
        var data = JSON.parse(body);
        cb(null, data);
      }
    });
  }
 


console.log('Welcome to the GitHub Avatar Downloader!');


getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    for (let repo of result) {
      console.log(repo.avatar_url)
    }
    // console.log("Result:", result);
});