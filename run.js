const express = require('express');
const app     = express();

app.set('view engine', 'ejs');

app.use('/libs', express.static('libs'));
app.use('/static', express.static('static'));

app.listen(3030, () =>{

   console.log('All is well');

});

// ce imamo articles/projects = v tem delu preden zrendramo gremo po podatke!!!
// ker nimamo podatke uporabimo tukaj request in neke podatke

app.get('/', (req, res)=>{

   var request = require('request');

   // 1 - 1 = 0, tako da zacnemo na 0 strani
   var pageNum = req.query.page-1;
   var postCount = 5;

   request('http://jsonplaceholder.typicode.com/posts', function (error, response, body) {
      if (!error && response.statusCode == 200) {
         console.log(body);

        //ce podatki ne pridejo v json obliki moramo to narediti. Body je string in ga bo razclenil v json data
         var jsonData = JSON.parse(body);

         //da se nam prikaze samo prvih pet clankov
         //var page = jsonData.splice(0,5);

         // 0 * 5 = smo na 0 strani, in vzame 5 posts.
         // zacnemo pri 0 in jih vzamemo 5 ven
         var page = jsonData.splice(pageNum*postCount, 5);

         //koliko strani imamo po 5 posts
         var pageLength = Math.floor(jsonData.length/5);

         res.render('landing', {posts: page, numPages: pageLength});
      }
   });

});