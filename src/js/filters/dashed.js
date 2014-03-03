ld.filter('dashed', [function() {

  return function(str) {
    return str.replace(/\s/g,'-');
  };

}]);
