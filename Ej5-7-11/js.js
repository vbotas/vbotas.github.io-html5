$(document).ready(function() {
	if(Modernizr.geolocation) {
		$('#p1').html('El navegador tiene implementada la opción de geolocalización');
	}
	else {
		$('#p1').html('Su navegador NO soporta la geolocalización');
	}
	$('#boton').click(function() {
		var divMapa = document.getElementById('mapa');
		navigator.geolocation.getCurrentPosition(hay_rpta, hay_error);

		function hay_rpta(respuesta) {
			
			var latitud = respuesta.coords.latitude;
			var longitud = respuesta.coords.longitude;
			var gLatLon = new google.maps.LatLng(latitud,longitud);
			var config_mapa = {
				zoom: 17,
				center: gLatLon
			}
			var marker = new google.maps.Marker({
    			position: gLatLon,
    			title: 'Mi posicion'
  			});

			var mapa = new google.maps.Map(divMapa, config_mapa);
			marker.setMap(mapa);
			
		};

		function hay_error() {
			$('#mapa').html('Hubo un problema solicitando los datos');
		};
	});
})