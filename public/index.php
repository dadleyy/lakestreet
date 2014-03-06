<!DOCTYPE html>
<html ng-app="lakestreet">
<head>
  <?php $cache_break = sha1(time()); ?>
  <meta charset="utf-8" />
  <title>lakestreet dive | interactive</title>
  <link href="/fonts/index.css?v=<?= $cache_break ?>" type="text/css" rel="stylesheet" />
  <link href="/css/app.css?v=<?= $cache_break ?>" type="text/css" rel="stylesheet" />
</head>
<body class="preload">
  <div ld-load-splash></div>
  <div class="page">
    <div ng-view>
    </div> 
  </div>
  <div ld-footer></div>
  <script src="/js/app.js?v=<?= $cache_break ?>" type="text/javascript"></script>
  <script src="/js/templates.min.js?v=<?= $cache_break ?>" type="text/javascript"></script>
</body>
</html>
