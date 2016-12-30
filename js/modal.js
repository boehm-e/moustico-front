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

(function() {
  $('.button_moins').click(function() {
	  calc_nbr_moustique(2)
  })
  $('.button_plus').click(function() {
	  calc_nbr_moustique(1)
  })
 })();
