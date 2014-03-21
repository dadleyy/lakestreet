describe('twitter date filter', function() {
  
  beforeEach(module('lakestreet'));

  var twitterDate;

  var prep = ['$filter', function() {
    twitterDate = arguments[0]('twitterDate');
  }];

  beforeEach(inject(prep));

  it('should return "just now" for recent tweets', function() {
  });

  it('should return "just now" for recent tweets', function() {
  });

  it('should return "just now" for recent tweets', function() {
  });


});
