(function() {

import "../../bower_components/jquery/dist/jquery"
import "../../bower_components/soundmanager2/script/soundmanager2"
import "../../bower_components/angular/angular"
import "../../bower_components/angular-route/angular-route"
import "../../bower_components/angular-resource/angular-resource"

import "module"
import "providers/"
import "config/"
import "var/"
import "routes/"
import "filters/"
import "services/"
import "directives/"
import "controllers/"
import "../../obj/twitter"

window.onload = (function() {
  angular.element(document).find('body').removeClass('preload');
});

})();
