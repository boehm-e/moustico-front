var my_intro
function init_tuto() {
    my_intro = introJs();
    my_intro.setOptions({
        steps: [
            {
                element: '#blood_A',
                intro: 'Votre sang de type A',
                position: 'right'
            },
            {
                element: '#blood_B',
                intro: 'Votre sang de type B',
                position: 'bottom'
            },
            {
                element: '#blood_AB',
                intro: 'Votre sang de type AB',
                position: 'bottom'
            },
            {
                element: '#blood_O',
                intro: 'Votre sang de type O',
                position: 'bottom'
            },
            {
                element: '#bloodhouse',
                intro: 'bloodhouse',
                position: 'right'
            }
        ]
    });
    my_intro.start();
    var _true = true;
    my_intro.onbeforechange(function(targetElement) {
        console.log(this._currentStep);
        $('.introjs-helperLayer').css({opacity: 0.1});
        if (this._currentStep == 3 && _true) {
            $('#modal1').modal('open');
        }
    });

    // my_intro.onafterchange(function(targetElement) {
    //     if (this._currentStep == 4) {
    //       $('.introjs-helperLayer').hide()
    //     }
    // });
}
