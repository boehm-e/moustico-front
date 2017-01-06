
(function() {
  $('#modal_caserne .moins').click(function(){
    var nbr = parseInt($('#modal_caserne .nbr_moustique').val()) || 0;
    var tmp = 0;
    if (nbr > 1)
      tmp = nbr - 1;
    $('#modal_caserne .nbr_moustique').val(tmp);
    Materialize.updateTextFields();
  })

  $('#modal_caserne .plus').click(function(){
    var nbr = parseInt($('#modal_caserne .nbr_moustique').val()) || 0;
    var tmp = nbr + 1;
    $('#modal_caserne .nbr_moustique').val(tmp);
    Materialize.updateTextFields();
  })
})();

function handleModal(name) {
  switch (name) {
    case "caserne":
    $('#modal_caserne').modal('open');
    break;
    case "caserne":
    $('#modal_bloodhouse').modal('open');
    break;
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
