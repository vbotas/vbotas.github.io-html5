$(document).ready(function () {
	var dibujar;
	var canvas = document.getElementById('canvas');
	var contexto = canvas.getContext('2d');
	var color;


	$('#canvas').mousedown(function(event) {
		dibujar = true;
		contexto = moveTo(event.clientX, event.clientY);

	});
	$('#canvas').mousemove(function(event) {
		if (dibujar === true) {
			var contexto =document.getElementById('canvas').getContext('2d');
			
			contexto.beginPath();
			contexto.fillStyle = 'rgb('+color+')';
			contexto.arc(event.clientX, event.clientY, 5, 0, 360);
			contexto.fill();




			// contexto.lineTo(event.clientX, event.clientY);
			// contexto.stroke();
		};
	});
	$('#canvas').mouseup(function() {
		dibujar = false;
	});

	$('.botonColor').click(function() {
		var col = $(this).attr('alt');
		color=col;
	});
	$('#borrarCanvas').click(function () {
		var canvas = document.getElementById('canvas');
		var contexto = canvas.getContext('2d');
		contexto.clearRect(0,0,canvas.width,canvas.height);
	});

});