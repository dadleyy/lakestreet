(function() {

import "../../bower_components/soundmanager2/script/soundmanager2"
import "../../bower_components/angular/angular"
import "../../bower_components/angular-route/angular-route"
import "../../bower_components/angular-resource/angular-resource"

var SM = soundManager;

import "module"
import "providers/"
import "config/"
import "var/"
import "routes/"
import "services/"
import "directives/"
import "controllers/"

window.onload = (function() {
  angular.element(document).find('body').removeClass('preload');
});

})();
