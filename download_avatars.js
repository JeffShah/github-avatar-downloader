var request = require('request')
var secrets = require('./secrets')
var fs = require('fs')
var args = process.argv.splice(2); // Step 9 cmd arguments

console.log('Welcome to the GitHub Avatar Downloader!');
//connects to github API

if (args.length === 2){
function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': "token " + secrets.GITHUB_TOKEN
      }
    };


    request(options, function(err, res, body) {
        cb(null, body);
      });
  }
getRepoContributors(arg[0], arg[1], function(err, result, callback) {
  console.log('Error:', err);
  console.log('Download starts now');
  var jaguar = JSON.parse(result);
  for (var obj of jaguar) {
    downloadImageByURL(obj['avatar_url'], './' + './avatars/' + obj['login'] + '.jpg', obj['login']);
  }

  function downloadImageByURL(url, filePath, login) {
    request.get(url)
    .on('error', function (err) {
      console.log('There was an error: ', err);
    })
    .on('response', function (response) {
      console.log('Image of: ' + login + ' downloaded!');
    })
    .pipe(fs.createWriteStream(filePath));
  }
  });
} else {
  console.log('GitHub Avatar Downloader depends on two (2) arguements. Please ensure both [username] [repo] are correct.');
}