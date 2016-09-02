//da skrijemo form-container in se prikaze samo, ko kliknemo na HIRE ME!

$('.form-container').hide();

// bo kliku na cta-button se bo form-container razsiril
//slideToggle: za vsako ko kliknem se preklopil - ali odprl ali zaprt!

$('.cta-button').on('click', ()=>{

   $('.form-container').slideToggle();

});


$('.submit-button').on('click', ()=>{
    
    // s tem pridobimo podatke, ki jih potrebujemo

    var email = $('#email').val();
    var company = $('#company').val();
    var website = $('#website').val();
    var jobDescription = $('#jobDescription').val();
    var budget = $('#budget').val();


    var data = {

        email:email,
        company:company,
        website:website,
        jobDescription:jobDescription,
        budget:budget

    };

    console.log(data);
    
    // posljemo podatke na server,
    // prvi parameter je route
    // drugi parameter so podatki
    // tretji parameter je callback iz streznika, da vem, da sem uspesno poslala formo

    $.post('/api/hire', data , function (res, statusString, responseData) {

        console.log(status, responseData.status);

    });

});