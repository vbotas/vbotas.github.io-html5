$(document).ready(function() {
	if(Modernizr.geolocation) {
		$('#p1').html('El navegador tiene implementada la opción de geolocalización');
	}
	else {
		$('#p1').html('Su navegador NO soporta la geolocalización');
	}
	$('#boton').click(function() {
		var divMapa = document.getElementById('mapa');
		var divMapa2 = document.getElementById('mapa2');
		navigator.geolocation.getCurrentPosition(hay_rpta, hay_error);
		navigator.geolocation.getCurrentPosition(hay_rpta2, hay_error);

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
		function hay_rpta2(respuesta) {
			
			var latitud2 = respuesta.coords.latitude;
			var longitud2 = respuesta.coords.longitude;
			var latantip = latitud2 * -1;
			var longantip = longitud2 + 180;
			var gLatLon2 = new google.maps.LatLng(latantip,longantip);
			var config_mapa2 = {
				zoom: 17,
				center: gLatLon2
			}
			var marker2 = new google.maps.Marker({
    			position: gLatLon2,
    			title: 'antipodas'
  			});

			var mapa2 = new google.maps.Map(divMapa2, config_mapa2);
			marker2.setMap(mapa2);
			
		};

		function hay_error() {
			$('#mapa').html('Hubo un problema solicitando los datos');
		};
	});
})