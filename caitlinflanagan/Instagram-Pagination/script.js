var instagramUrl = ('');
var loading = false;

function successCallback(response) {
	console.log('loaded');
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

	instagramUrl = response.pagination.next_url;
	loading = false;

}

// function successCallback(response) {
// 	var modalElement = document.getElementById('modal');
// 	console.log(response);
// 	response.data.forEach(function(modal) {
// 		console.log(modal);
// 		var html = '';
// 		html += '<img class="instagram" src="' + modal.images.standard_resolution.url + '">';
// 		modalElement.innerHTML += html;
// 	});

// 	instagramUrl = response.pagination.next_url;
// 	loading = false;

// }

$(document).ready(function() {
	instagramUrl = 'https://api.instagram.com/v1/tags/wimbledon/media/recent?client_id=d73fd06d0eb840b6ae6d2b983007a1b9';
	$('#next-page').click(function() {
		console.log('click');
		console.log('loading');
		if (loading) return;
		loading = true;
		
		var options = {
			type: 'GET',
			dataType: 'jsonp',
			url: instagramUrl,
			success: successCallback,
		}

		$.ajax(options);

		return false;
	});
	$('#next-page').trigger('click');
});

$(window).scroll(function() {
	var windowY = window.innerHeight + document.body.scrollTop;
	var contentY = $('#photos').height() + $('#photos').offset().top;
	var threshold = 500;
	if (windowY > contentY - threshold) {
		$('#next-page').trigger('click');
	}
})



