ld.service('XhrMonitor', ['POOL_SIGALS', function(POOL_SIGALS) {

  var XhrMonitor = {},
      template_rgx = /^(\w+)\.(\w+)$/;

  function isTemplate(xhr_config) {
    return template_rgx.test(xhr_config.url);
  }

  function updatePool(signal) {

  }

  XhrMonitor.request = function(request) {
    if(!isTemplate(request))
      updatePool(POOL_SIGALS.OPENED);

    return request;
  };

  return XhrMonitor;

}]);
