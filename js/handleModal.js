function handleModal(name) {
	console.log(name)
	  if (name == 'caserne') {
		  $('#modal_caserne').modal('open');
	  }
}

function calc_nbr_moustique(evenement) {
	var nbr = $('.nbr_moustique').val();
	if (nbr >= 0) {
		if (evenement == 1)
			$('.nbr_moustique').val(parseFloat(nbr) + 1);
		else if (evenement == 2)
			$('.nbr_moustique').val(parseFloat(nbr) - 1);
	}
  else {
	  $('.nbr_moustique').val(0);
  }
  Materialize.updateTextFields();
}

