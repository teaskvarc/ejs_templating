const express = require('express');
const app     = express();
const request = require('request');

   //ne rabimo mapo: views nikjer polinkat, ker s tem dolocimo, da so template avtomatsko v mapi views! po defaultu!
app.set('view engine', 'ejs');

app.use('/libs', express.static('libs'));
app.use('/static', express.static('static'));

app.listen(3030, () =>{

   console.log('All is well');

});

/////////////////////////////////////////////////
//ONE ARTICLE

// V tem primeru je BODY string, vrne text; ni objekt; da dobimo objekt z array-i, parametri
//moramo pognati JSON.parse

app.get('/article/:id', (req, res)=>{

   var articleId = req.params.id;

   request('http://jsonplaceholder.typicode.com/posts/'+articleId, (err, response, body)=>{

      var jsonData = JSON.parse(body);

      //povemo kateri ejs rendramo, kot drugi parameter posljemo podatke
      res.render('article', {article:jsonData});

   });

});



// route, da pridobimo podatke/nam servira podatke za endless scroll
app.get('/api/posts', (req, res)=>{

   var pageNum = req.query.page-1;
   var postCount = req.query.postCount ? req.query.postCount :5;

   request('http://jsonplaceholder.typicode.com/posts', function (error, response, body) {
      if (!error && response.statusCode == 200) {
         console.log(body);

         var jsonData = JSON.parse(body);
         var pageLength = Math.ceil(jsonData.length / postCount);
         var page = jsonData.splice(pageNum * postCount, postCount);

         // nazaj dobimo array vseh posts, ki jih potrebujemo zrisali
         res.send(page);

      }
   });
});


///////////////////////////////////////////////////////////////////////////////////////////
// ce imamo articles/projects = v tem delu preden zrendramo gremo po podatke!!!
// ker nimamo podatke uporabimo tukaj request in neke podatke

//TA ROUTE SE POZENE OB VSAKEM KLIKU NA PAGE
//vsakic gre na streznik po Posts na spodnji URL, jih vrne nazaj in pozene render

app.get('/', (req, res)=>{

   var request = require('request');

   // 1 - 1 = 0, tako da zacnemo na 0 strani
   var pageNum = req.query.page-1;
   
   //var postCount = req.query.postCount;

   //prvo je pogoj, v kolikor to obstaja bo vzelo prvo vrednost, do :, ce ne obstaja bo druga vrednost (10) default

   var postCount = req.query.postCount ? req.query.postCount :5;

   request('http://jsonplaceholder.typicode.com/posts', function (error, response, body) {
      if (!error && response.statusCode == 200) {
         console.log(body);

        //ce podatki ne pridejo v json obliki moramo to narediti. Body je string in ga bo razclenil v json data

         var jsonData = JSON.parse(body);

         //da se nam prikaze samo prvih pet clankov
         //var page = jsonData.splice(0,5);

         //koliko strani imamo po 5 posts
         //najprej preberemo dolzino, potem sledi splice

         var pageLength = Math.ceil(jsonData.length/postCount);

         // 0 * 5 = smo na 0 strani, in vzame 5 posts.
         // zacnemo pri 0 in jih vzamemo 5 ven

         var page = jsonData.splice(pageNum * postCount, postCount);

         res.render('landing', {
            posts     :page,
            numPages  :pageLength,
            pageNum   :pageNum,
            postCount :postCount

         });
      }
   });
});