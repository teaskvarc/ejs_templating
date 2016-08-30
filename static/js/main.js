// vseboval bi vso kodo, ki bo jo potrebovali na Front-end
// da se zacne neki vrteti, animacija, itd.

//KLIKANJE, SHARE BUTTON, etc. : te akcije ujamemo v JS, ki je v browser-ju
////////////////////////////////////////////////////////////////////////////////

$('body').on('mousewheel', function () {

    var windowHeight = window.innerHeight;
    var scrollTop = $('body').scrollTop();

    var maxOffset = $('body').height() - windowHeight;

    console.log('Max offset: ', maxOffset);
    console.log('Current scroll: ', scrollTop);

    if(scrollTop >= maxOffset){



    };

});