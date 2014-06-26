var options = {
	type: 'GET',
	dataType: 'jsonp',
	url: 'https://api.instagram.com/v1/media/popular?client_id=d73fd06d0eb840b6ae6d2b983007a1b9',
	success: successCallback,
}

function successCallback(response) {
	var photosElement = document.getElementById('photos');
	console.log(response);
	response.data.forEach(function(photo) {
		console.log(photo);
		var html = '';
		html += '<a class="col-md-3 photo" href="' + photo.link + '">';
		html += '<img class="instagram" src="' + photo.images.standard_resolution.url + '">';
		html += '<img class="profile_picture" src="' + photo.user.profile_picture + '">';
		html += '<div class="profile_name">' + photo.user.full_name + '</div>'
		html += '</a>';
		photosElement.innerHTML += html;
	});

}

$.ajax(options);