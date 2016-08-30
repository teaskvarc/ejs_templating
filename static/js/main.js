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

        pageNum++;


            // TUKAJ DOBIMO PODATKE IN HTML
            //function(res): to je asinhrona operacija, ker ni sinhornizirana z ostalim
            // gre na streznik, caka na response, zato imamo tukaj: isLoading:false
           //v drugi vrstici pa: isLodaing: true - ta se prej zgodi/dogaja;

        $.get('/api/posts?page='+pageNum, function (res) {

            console.log(res);
            isLoading = false;

            renderPosts(res);

        });

        isLoading = true;
        
    };
});

//array nasih posts
//glede na ta array bom dodala nove posts, potem scrollamo dol in se dinamicno nalagajo
//zrisala isto strukturo, kot jo risemo za vsak post posebej v EJS, samo tokrat sem uporabila jQuery
//tole funkcijo vstavimo in poklicemo zgoraj

function renderPosts(posts){

    //jQuery ima each metodo s katero loop-amo

    $.each(posts, function (i, post) {


        //kot spremenljivke sem shranila te 4 elemente

        var $postContainer  = $('<div>', {class:'post-container'});
        var $postTitle      = $('<h1>', {class:'post-title', text:post.title + '/' +post.id});
        var $postContent    = $('<div>', {class:'post-content', text:post.body});
        var $postLink       = $('<a>', {href:'/article/'+post.id, text:'Read more ...'});
        var $hr             = $('<hr/>');
        var $br             = $('<br>');

        //tukaj v container vstavimo vse 3 spremenljivke
        //zaporednje je pomembno, ker se po tem zaporednju vstavijo v HTML

        $postContainer.append($postTitle, $postContent, $br , $postLink, $hr);

            //postContainer vstavimo v posts-container
        $('.posts-container').append($postContainer);

    });

}