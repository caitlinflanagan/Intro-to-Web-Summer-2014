$(document).ready(function() {
	var instagramClientId = 'd73fd06d0eb840b6ae6d2b983007a1b9';
	var centerOfToronto = new google.maps.LatLng(43.653226000000000000, -79.383184299999980000);
	var mapContainer = $('#map-container')[0];
	theBigMap = new google.maps.Map(mapContainer, {
		zoom: 14,
		center: new google.maps.LatLng(43.653226000000000000, -79.383184299999980000)
});

	console.log('document is ready');
	searchPhotos(centerOfToronto);
	var openPhotoWindow = false;

	function searchPhotos(location) {
		$.ajax({
			type: 'GET',
			dataType: 'jsonp',
			url: 'https://api.instagram.com/v1/media/search?client_id=' + instagramClientId + '&lat=' + location.lat() + '&lng=' + location.lng(),
			success: function(response) {
				// console.log(response.data);
				response.data.forEach(function(photo) {
					console.log(photo.location);
					console.log(photo);
					
					var customPhotoMarker = {
						    url: photo.user.profile_picture,
						    scaledSize: new google.maps.Size(50, 50),
						    origin: new google.maps.Point(0, 0),
						    anchor: new google.maps.Point(0, 32)
					}

					var photoMarker = new google.maps.Marker({
						position: new google.maps.LatLng(photo.location.latitude, photo.location.longitude),
						map: theBigMap,
						icon: customPhotoMarker,
					});

					// var photoWindowContent = '';

					// photoWindowContent += 
					// 	if (photo.location.name)

					var photoWindow = new google.maps.InfoWindow({
						content: '<a href="' + photo.link + '"><img class="insta-photo" src=' + photo.images.low_resolution.url + '/></a>'
									+ '<p>Photo Courtesy of ' + photo.user.full_name + ' (@' + photo.user.username + ')</p>',
					});

					google.maps.event.addListener(photoMarker, 'click', function(event) {
						console.log(event);
						if (openPhotoWindow) {
							openPhotoWindow.close()
						}
						photoWindow.open(theBigMap, photoMarker);
						theBigMap.setCenter(event.latLng);
						openPhotoWindow = photoWindow;
					});

				});
			},
		}); //ajax
	};

});

console.log('testing 1 2 3');