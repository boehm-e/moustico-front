
(function() {

  // CASERNE
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

  $('#modal_caserne .submit').click(function(){
    socket.emit('enrole', {
      number: parseInt($('#modal_caserne .nbr_moustique').val()) || 0,
      level: GLOBAL.data.factory.level
    });
    $('#modal_caserne .nbr_moustique').val(0);
  })




  //
  $('#modal_canon .moins').click(function(){
    var nbr = parseInt($('#modal_canon .nbr_moustique').val()) || 0;
    var tmp = 0;
    if (nbr > 1)
    tmp = nbr - 1;
    $('#modal_canon .nbr_moustique').val(tmp);
    Materialize.updateTextFields();
  })

  $('#modal_canon .plus').click(function(){
    var nbr = parseInt($('#modal_canon .nbr_moustique').val()) || 0;
    var tmp = nbr + 1;
    $('#modal_canon .nbr_moustique').val(tmp);
    Materialize.updateTextFields();
  })

  $('#modal_canon .submit').click(function(){
    socket.emit('attack', {
      number: parseInt($('#modal_canon .nbr_moustique').val()) || 0,
      level: GLOBAL.data.factory.level
    });
    $('#modal_canon .nbr_moustique').val(0);
  })







})();

function handleModal(name) {
  switch (name) {
    case "caserne":
    $('#modal_caserne').modal('open');
    slideContainer.slick('slickGoTo', 0)
    break;
    case "bloodhouse":
    $('#modal_bloodhouse').modal('open');
    slideContainer.slick('slickGoTo', 1)
    break;
    case "canon":
    $('#modal_canon').modal('open');
    slideContainer.slick('slickGoTo', 2)
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
