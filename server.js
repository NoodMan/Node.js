var inventory = require("./inventory.json") //inventory copie!!

const fs = require('fs') // pour interagire avec les systeme de la machine
const express = require("express");
const cors = require("cors") // pour les erreurs


var app = express() // framework 
const port = "90" // mon port
app.use(cors())

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.get("/", (req, res) => { // pour l'affichage la route
    // console.log('-->⛔️ Je suis ici 1 🎉 <--');
    res.send("Hello")
})

// app.post("/", (req, res) => {
//         res.send("J'ai réussi je suis sur ma page d'accueil!! 🎉")
// })
app.get("/articles", (req, res) => { // pour l'affichage la route 
    //  console.log('-->⛔️ Je suis ici get🎉 <--');
    res.json(inventory)
})
// app.get("/modify", (req, res) => { // pour l'affichage la route 
//     //  console.log('-->⛔️ Je suis ici get🎉 <--');
//     res.json(inventory)
// })

app.post("/articles", (req, res) => { // pour faire des modifications
    const id = Number(req.body.id) // recuparation des valeurs
    //  console.log('-->⛔️ Je suis ici post 🎉 <--');
    const title = req.body.title

    let articleFound = {}; //création variable objet vide
    
    inventory.articles.forEach((article) => { //pour trouver l'article qui correcpond à la requete
        if (article.id === id)  { // verification
            article.title = title // assignation  et modification valeur du title dans copie (articleFound) ok new title
            articleFound = article // remplacement [] = [new id...]
        };
    })
    if (articleFound === null) { //verification 
        res.send("⚠️ Pas d'article trouvé 😕");
    }

    fs.writeFileSync("./inventory.json", JSON.stringify(inventory)) //ecriture dans le fichier avec le new contenue
    
    res.json(articleFound) // pour renvoie l'article modifier
})


// mettre toujours à la fin 
app.listen("90", () => {
    console.log("server running on port " + port);
})

