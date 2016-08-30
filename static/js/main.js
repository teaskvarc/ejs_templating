// vseboval bi vso kodo, ki bo jo potrebovali na Front-end
// da se zacne neki vrteti, animacija, itd.

//KLIKANJE, SHARE BUTTON, etc. : te akcije ujamemo v JS, ki je v browser-ju

// ko je aplikacija enkrat nalozena, potem ko dobimo cel HTML v browser, prevzame
// kakrsnokoli interaktivnost ta JavaScript

////////////////////////////////////////////////////////////////////////////////

var isLoading = false;

$('body').on('mousewheel', function () {

    var windowHeight = window.innerHeight;
    var scrollTop = $('body').scrollTop();

    var maxOffset = $('body').height() - windowHeight;

    console.log('Max offset: ', maxOffset);
    console.log('Current scroll: ', scrollTop);

    if(scrollTop >= maxOffset && !isLoading){

            //function(res): to je asinhrona operacija, ker ni sinhornizirana z ostalim
            // gre na streznik, caka na response, zato imamo tukaj: isLoading:false
           //v drugi vrstici pa: isLodaing: true - ta se prej zgodi/dogaja;

        $.get('/api/posts?page='+(pageNum+1), function (res) {

            console.log(res);
            isLoading = false;

        });

        isLoading = true;
        
    };
});

//array nasih posts
//glede na ta array bomo dodali nove posts, potem scrollamo dol in se dinamicno nalagajo

function renderPosts(posts){

    var postContainer = $('<div>', {class:'post-container'});


}