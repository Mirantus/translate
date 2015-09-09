<?php
	phpinfo();
	$file = file('list.csv');
	$list = array();
	foreach ($file as $i => $string) {
		$string = explode(';', $string);
		$list[$i]['en'] = trim($string[0]);
		$list[$i]['trans'] = trim($string[1]);
		$list[$i]['ru'] = trim($string[2]);
		$list[$i]['know'] = 0;
	}
exit;
?>
<!doctype html>
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html; charset=utf-8">
		<meta name="viewport" content="width=320; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">
		<link rel="stylesheet" href="css/iphone.css">
		<link rel="stylesheet" href="css/style.css">
		<title>Зубрилка</title>
	</head>
	<body>
		<div id="header">
			<h1></h1>
			<a id="backButton" href="#">Назад</a>
			<a id="switch" href="#" class="nav Action">En / Ru</a>
		</div>
		<ul class="data">
			<li>
				<p id="text"></p>
			</li>
		</ul>
		<ul class="individual">
			<li>
				<a id="answer" href="#">Показать ответ</a>
				<a id="know" href="#">Знаю</a>
				<a id="start" href="#">Начать заново</a>
			</li>
			<li id="next-li">
				<a id="next" href="#">Дальше</a>
			</li>
		</ul>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		<script>
			var list = <?=json_encode($list)?>;
		</script>
		<script src="script.js"></script>
	</body>
</html>