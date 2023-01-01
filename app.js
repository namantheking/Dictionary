const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname +"/index.html");
})  

app.post("/", function(req, res){
    const options = {
        method: 'GET',
        url: 'https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary',
        params: {word: req.body.word},
        headers: {
          'X-RapidAPI-Key': '85f9fc918bmshee68e4a64895bdbp12e8b7jsn857565e91ba7',
          'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        const data = response.data;
        let def = data.definition;
        let word = req.body.word;
        res.send(`<!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="css/style.css">
                <title>Document</title>
            
            </head>
            
            <body>
                <header>
                    <nav>
                        <ul>
                            <div class="list-item">
                                <li><img src="images/logo.png" alt="Logo Here"></li>
                                <li><a href="/">Home</a></li>
                                <li><a href="">About</a></li>
                                <li><a href="">Contact</a></li>
                            </div>
                            <div class="form">
                                <form action="/" method="post">
                                    <input type="text" placeholder="Type the word" name="word" autocomplete="off">
                                    <input type="submit" value="Search">
                                </form>
                            </div>
                        </ul>
                    </nav>
                </header>
            
                <div class="container">
                    <h1>${word}</h1>
                    <p>${def.replace("2.", "<br><br>2.").split("3.")[0]}</p>
                </div>
            </body>
            
            </html>`);
    }).catch(function (error) {
        console.error(error);
    });
})

app.listen(3000, function(){
    console.log("Server running on port 3000");
})