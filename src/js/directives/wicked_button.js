ld.directive('ldWickedButton', ['Loop', 'ICONS', function(Loop, ICONS) {

  function rand(min, max) {
    min = min || -5;
    max = max || 5;
    return Math.random() * (max - min + 1) + min;
  }

  var particle_count = 25,
      dimension = 100,
      half_dim_sq = (dimension * 0.5) * (dimension * 0.5),
      fade_buffer = 600,
      gravity = 0.02;

  function Particle(context) {
    this.context = context;
    this.reset();
  };

  Particle.prototype.reset = function() {
    this.position = { x: dimension * 0.5, y: dimension * 0.5 };
    this.velocity = { x: rand(-1,1), y: rand(-1, -0.5) };
    this.opacity = 1.0;
    this.age = 0;
    this.radius = rand(2,6);

    var red = parseInt(rand(100,188), 10),
        green = parseInt(rand(200,255), 10),
        blue = parseInt(rand(200,255), 10);

    this.color = { r: red, g: green, b: blue };
  };

  Particle.prototype.update = function() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.y += gravity;

    this.context.beginPath();
    this.context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
    var rgba = [this.color.r, this.color.g, this.color.b, this.opacity].join(','),
        fill = ["rgba(", rgba, ")"].join('');

    this.context.fillStyle = fill;
    this.context.fill();

    this.age ++;

    var x_dist = this.position.x - 50,
        y_dist = this.position.y - 50,
        t_dist = (x_dist * x_dist) + (y_dist * y_dist);

    this.opacity = 1 - (t_dist / (half_dim_sq - fade_buffer));

    if(t_dist > half_dim_sq)
      this.reset();
  };

  function Effect(context) {
    this.context = context;
    this.running = false;
    this.loop_id = null;
    this.particles = [];

    for(var i = 0; i < particle_count; i++)
      this.particles.push(new Particle(this.context));
  };

  Effect.prototype.update = function() {
    this.clear();
    for(var i = 0; i < this.particles.length; i++)
      this.particles[i].update();
  };

  Effect.prototype.begin = function() {
    if(!this.running)
      this.loop_id = Loop.add(angular.bind(this, this.update));

    this.running = true;
  };

  Effect.prototype.clear = function() {
    this.context.clearRect(0,0, dimension, dimension);
  };

  Effect.prototype.end = function() {
    this.clear();
    for(var i = 0; i < this.particles.length; i++)
      this.particles[i].reset();

    Loop.remove(this.loop_id);
    this.running = false;
  };

  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'directives.wicked_button',
    transclude: true,
    scope: { text: '@', click: '&', icon: '@', silent: '@' },
    link: function($scope, $element, $attrs) {
      var canvas = document.createElement('canvas'),
          context = canvas.getContext('2d'),
          canvas = angular.element(canvas),
          effect = new Effect(context),
          button = $element.find('button'),
          icon = d3.select(button[0]).append('svg'),
          icon_width = 30,
          icon_height = 30;

      canvas.attr('width', '100px').attr('height', '100px');
      var path = icon.attr({width: icon_width, height: icon_height}).append('path');

      if(ICONS[$scope.icon])
        path.attr({d: ICONS[$scope.icon], fill: '#414141'});

      $scope.over = function() {
        if(!$scope.silent)
          effect.begin();
      };

      $scope.out = function() {
        if(!$scope.silent)
          effect.end();
      };

      $element.append(canvas);
    }
  };

}]);
