$(document).ready(function() {

	if (Modernizr.video.ogg) {
		//alert('El navegador soporta videos ogg');
		$('#p1').html('El navegador soporta videos ogg');
	} else {
		//alert('El navegador NO soporta videos ogg');
		$('#p1').html('El navegador NO soporta videos ogg');
	};

	if (Modernizr.video.webm) {
		//alert('El navegador soporta videos WebM');
		$('#p2').html('El navegador soporta videos WebM');
	} else {
		//alert('El navegador NO soporta videos WebM');
		$('#p2').html('El navegador NO soporta videos WebM');
	};
})