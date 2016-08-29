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

   request('http://jsonplaceholder.typicode.com/posts', function (error, response, body) {
      if(!error && response.statusCode == 200){
         console.log(body) //Show the Html for the Google homepage
      }

   });

   res.render('landing');

});