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
    });

    $('.button_plus').click(function() {
        calc_nbr_moustique(1)
    })
})();

function handleModal(name) {
	console.log(name)
	  if (name == 'caserne') {
		  $('#modal_caserne').modal('open');
	  }
	  else if (name == 'bloodhouse') {
		  $('#modal_bloodhouse').modal('open');
	  }
}
var slideContainer;
(function() {

    slideContainer = $('.slide-container');

    slideContainer.slick();

    $('.clash-card__image img').hide();
    $('.slick-active').find('.clash-card img').fadeIn(200);

    // On before slide change
    slideContainer.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.slick-active').find('.clash-card img').fadeOut(1000);
    });

    // On after slide change
    slideContainer.on('afterChange', function(event, slick, currentSlide) {
        $('.slick-active').find('.clash-card img').fadeIn(200);
    });

})();
