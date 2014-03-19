ld.directive('ldTwitterFeedItem', [function() {
  
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'directives.twitter_feed_item',
    scope: { tweet: '=' },
    require: '^ldTwitterFeed',
    link: function($scope, $element, $attrs, twitterFeed) {
      var $text_element = null;

      $scope.over = function() {
        if(!twitterFeed.isExpanded())
          return false;

        var inner = $text_element.find('> .inner').first(),
            height = inner.height();

        $text_element.stop().animate({height: [height,'px'].join('')}, 300);
      };

      $scope.out = function() {
        $text_element.stop().animate({height: '0px'}, 300);
      };

      $text_element = $element.find('.text');
    }
  };

}]);
