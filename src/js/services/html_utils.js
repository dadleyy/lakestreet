ld.service('HtmlUtils', [function() {

  var HtmlUtils = {};

  HtmlUtils.getOffset = function(element, ref_obj) {
    if(!element)
      return;

    ref_obj.x += element.offsetLeft;
    ref_obj.y += element.offsetTop;
    HtmlUtils.getOffset(element.offsetParent, ref_obj);
  }

  return HtmlUtils;

}]);
