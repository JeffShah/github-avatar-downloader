var request = require('request')
var secrets = require('./secrets')
var fs = require('fs')
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

function downloadImageByURL(url, filePath) {
  request.get(url).pipe(fs.createWriteStream(filePath));
  //console.log( "Downloading file ");  
}


console.log('Welcome to the GitHub Avatar Downloader!');

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  for (let repo of result) {
  downloadImageByURL(repo.avatar_url, 'avatars/' + repo.login + '.jpg')

  //console.log(repo.login)
}
     //console.log("Result:", result);
});