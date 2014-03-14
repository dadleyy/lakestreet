ld.directive('ldTwitterFeed', ['MenuManager', function(MenuManager) {

  function TwitterFeed($scope) {
    $scope.expanded = false;
    this.menu_id = null;
    this.$scope = $scope;
  };

  TwitterFeed.prototype.toggle = function(evt) {
    evt.stopPropagation();

    this.$scope.expanded = !this.$scope.expanded;

    if(this.$scope.expanded)
      this.menu_id = MenuManager.push(angular.bind(this,this.close));
    else
      MenuManager.pop(this.menu_id);

    return this.$scope.expanded;
  };

  TwitterFeed.prototype.close = function() {
    this.$scope.expanded = false;
  };

  TwitterFeed.prototype.isExpanded = function() {
    return this.$scope.expanded === true;
  };

  TwitterFeed.$inject = ['$scope'];

  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'directives.twitter_feed',
    scope: { tweets: '=' },
    controller: TwitterFeed,
    link: function($scope, $element, $attrs, twitterFeed) {
      $scope.expanded = false;

      $scope.expand = function(evt) { 
        return twitterFeed.toggle(evt);
      };
    }
  };

}]);
