document.addEventListener('DOMContentLoaded', function() {
	var texts = (document.querySelectorAll('input[type="text"]'));
	var submit = document.querySelectorAll('input[type="submit"]')[0];
	var tbody = document.querySelectorAll('table tbody')[0];
	var students = JSON.parse(localStorage.getItem('students')) || [];

	students.forEach(drawStudent);

	submit.addEventListener('click', function() {
		var student = {
			firstName: texts[0].value,
			lastName: texts[1].value,
			phoneNumber: texts[2].value,
			emailAddress: texts[3].value,
		};

		drawStudent(student);

		students.push(student);
		localStorage.setItem('students', JSON.stringify(students));
	
	});

	function drawStudent(student) {
		var tableRow = '';

		tableRow +=	'<tr>';
		tableRow +=	'<td>' + student.firstName + '</td>';
		tableRow +=	'<td>' + student.lastName + '</td>';
		tableRow +=	'<td>' + student.phoneNumber + '</td>';
		tableRow +=	'<td>' + student.emailAddress + '</td>';
		tableRow +=	'</tr>';

		tbody.innerHTML += tableRow;	
	}
});