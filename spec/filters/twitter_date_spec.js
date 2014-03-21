describe('twitter date filter', function() {
  
  beforeEach(module('lakestreet'));

  var twitterDate;

  var prep = ['$filter', function() {
    twitterDate = arguments[0]('twitterDate');
  }];

  beforeEach(inject(prep));

  beforeEach(function() {
    window['__today__'] = new Date(1395377798130);
  });

  it('should return "just now"', function() {
    var out = twitterDate("Fri Mar 21 04:56:38 +0000 2014");
    expect(out).toBe('just now');
  });

  it('should return "5 minues ago"', function() {
    var out = twitterDate("Fri Mar 21 04:51:38 +0000 2014");
    expect(out).toBe('5 minutes ago');
  });

  it('should return "1 hour ago"', function() {
    var out = twitterDate("Fri Mar 21 03:56:38 +0000 2014");
    expect(out).toBe('1 hour ago');
  });

  it('should return "1 day ago"', function() {
    var out = twitterDate("Fri Mar 20 04:55:38 +0000 2014");
    expect(out).toBe('1 day ago');
  });


});
