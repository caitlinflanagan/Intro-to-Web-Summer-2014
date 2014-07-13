// wait for code to load then run the code inside the anonymous function
$(document).ready(function() {

	navigator.geolocation.getCurrentPosition(function(position) {
		var myLatLong = new google.maps.LatLng(
			position.coords.latitude,
			position.coords.longitude
		);
		
		var element = $('#map-canvas')[0];
		var fullscreenMap = new google.maps.Map(element, {
			center: myLatLong,
			zoom: 16,
		});
	
		// creating a marker for your map
		new google.maps.Marker({
			position: myLatLong,
			map: fullscreenMap,
		});

		// user generated latitude and longitude values
		$('.maps').submit(function() {
			var latitude = $(this).find('[name="latitude"]').val();
			var longitude = $(this).find('[name="longitude"]').val();

			var userLatLong = new google.maps.LatLng(
				latitude,
				longitude
			);
			
			var userFullscreenMap = new google.maps.Map(element, {
				center: userLatLong,
				zoom: 12,
			});

			new google.maps.Marker({
				position: userLatLong,
				map: userFullscreenMap,
			});

			console.log(latitude, longitude);
		
			// prevent the default browser behaviour
			return false;
		});

	});

});