var tv;
var reactor;
var latest;

$(document).ready(function() {
	reactor = new Reactor();
	reactor.start();
});

function max_id(ar) {
	return ar.sort(function(a, b) { return a.id - b.id }).reverse()[0].id;
}

function pad(number) {
	var tmp = '' + number;
	while (tmp.length < 2) {
		tmp = '0' + tmp;
	}
	return tmp;
}

function fetch_json() {
	$.ajax({
		url: 'tv.py',
		dataType: 'json',
		success: function(response) {
			if (!tv || max_id(response) > max_id(tv)) {
				tv = response;
				parse_tv();
			}
		},
		error: function() {
			$('#content').html("<h1>TV be ded</h1>");
		}
	});
}

function parse_tv() {
	$('#content').html('<table id="tv"><thead><tr><th>Name</th><th>Hybrid</th><th>Season</th><th>Episode</th><th>Rating</th><th>View date</th></tr></thead></table>');
	for (row in tv) {
		parse_row(tv[row]);
	}
	$('#tv').tablesorter();
}

function parse_row(row) {
	$('#tv').append('<tr><td>' + row.name + '</td><td>' + row.season + 'x' + pad(row.episode) + '</td><td>' + row.season + '</td><td>' + row.episode + '</td><td>' + row.rating.toFixed(2) + '</td><td>' + row.view_date + '</td></tr>');
}

var Reactor = function() {
	this.timer;
	this.delay = 10000;
}
Reactor.prototype.start = function() {
	fetch_json();
	this.timer = setInterval(function() {
		fetch_json();
	}, this.delay);
}
Reactor.prototype.stop = function() {
	clearInterval(this.timer);
}
Reactor.prototype.set_delay = function(delay) {
	if (jQuery.isNumeric(delay)) this.delay = delay;
	this.restart();
	if (this.delay < 1000) this.meltdown();
}
Reactor.prototype.restart = function() {
	this.stop();
	this.start();
}
Reactor.prototype.meltdown = function() {
	this.stop();
	Reactor = null;
	reactor = null;
	alert("NUCLEAR MELTDOWN");
}
