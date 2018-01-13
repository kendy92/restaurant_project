document.getElementById('careers_form').onsubmit = function (ev) {
	ev.preventDefault()
	alert('Thank you, your application has been sumbited')
	ev.target.reset()
	return false
}
