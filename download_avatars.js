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
getRepoContributors(args[0], args[1], function(err, result, callback) {
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


/*
I ran node jquery jquery command
output:
node download_avatars.js jquery jquery
Welcome to the GitHub Avatar Downloader!
Error: null
Download starts now
Image of: jeresig downloaded!
Image of: timmywil downloaded!
Image of: jzaefferer downloaded!
Image of: dmethvin downloaded!
Image of: rwaldron downloaded!
Image of: markelog downloaded!
Image of: mgol downloaded!
Image of: gibson042 downloaded!
Image of: csnover downloaded!
Image of: mikesherov downloaded!
Image of: brandonaaron downloaded!
Image of: flesler downloaded!
Image of: louisremi downloaded!
Image of: gnarf downloaded!
Image of: davids549 downloaded!
Image of: Krinkle downloaded!
Image of: wycats downloaded!
Image of: rkatic downloaded!
Image of: jitter downloaded!
Image of: jbedard downloaded!
Image of: scottgonzalez downloaded!
Image of: cowboy downloaded!
Image of: kswedberg downloaded!
Image of: azatoth downloaded!
Image of: danheberden downloaded!
Image of: malsup downloaded!
Image of: jboesch downloaded!
Image of: elijahmanor downloaded!
Image of: pbakaus downloaded!
Image of: mathiasbynens downloaded!



and:


vagrant [github-avatar-downloader]> node download_avatars.js nodejs node
Welcome to the GitHub Avatar Downloader!
Error: null
Download starts now
Image of: isaacs downloaded!
Image of: bnoordhuis downloaded!
Image of: Trott downloaded!
Image of: ry downloaded!
Image of: indutny downloaded!
Image of: addaleax downloaded!
Image of: BridgeAR downloaded!
Image of: joyeecheung downloaded!
Image of: jasnell downloaded!
Image of: danbev downloaded!
Image of: trevnorris downloaded!
Image of: cjihrig downloaded!
Image of: rvagg downloaded!
Image of: targos downloaded!
Image of: tjfontaine downloaded!
Image of: mscdex downloaded!
Image of: vsemozhetbyt downloaded!
Image of: shigeki downloaded!
Image of: sam-github downloaded!
Image of: apapirovski downloaded!
Image of: TooTallNate downloaded!
Image of: Fishrock123 downloaded!
Image of: tniessen downloaded!
Image of: evanlucas downloaded!
Image of: koichik downloaded!
Image of: MylesBorins downloaded!
Image of: TimothyGu downloaded!
Image of: refack downloaded!
Image of: thefourtheye downloaded!
Image of: piscisaureus downloaded!
*/