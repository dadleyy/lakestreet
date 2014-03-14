ld.filter('twitterText', ['$sce', function($sce) {
  
  var MENTION_REGEX = /@(\w+)/g,
      MENTION_REPLACE = "<a href=\"https://twitter.com/$1\" target=\"_blank\">$1</a>",
      HASH_REGEX = /#(\w+)/g,
      HASH_REPLACE = "<a href=\"http://twitter.com/search?q=%23$1\" target=\"_blank\">#$1</a>",
      LINK_REGEX = /http([s]?):\/\/([^\ \)$]*)/g,
      LINK_REPLACE = "<a href=\"http://$2\" target=\"_blank\">$2</a>";

  function parseEntities(text) {
    var links= text.replace(LINK_REGEX, LINK_REPLACE),
        mentions = links.replace(MENTION_REGEX, MENTION_REPLACE),
        hashes = mentions.replace(HASH_REGEX, HASH_REPLACE);

    return hashes;
  };

  return function(tweet) {
    var linked = parseEntities(tweet.text),
        html = ["<p>", linked, "</p>"].join('');

    return $sce.trustAsHtml(html);
  };

}]);
