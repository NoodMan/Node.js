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


app.post("/modify", (req, res) => { // pour faire des modifications
    const id = Number(req.body.id) // recuparation des valeurs
    //  console.log('-->⛔️ Je suis ici post 🎉 <--');
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const currency = req.body.currency
    const brand = req.body.brand

    let articleFound = {}; //création variable objet vide

    inventory.articles.forEach((article) => { //pour trouver l'article qui correcpond à la requete
        if (article.id === id) { // verification
            if (article.title !== title) { //verification si different
                article.title = title // assignation  et modification valeur du title dans copie (articleFound) ok new title
            } if (article.description !== description) {
                article.description = description
            } if (article.price !== price) {
                article.price = price
            } if (article.currency !== currency) {
                article.currency = currency
            } if (article.brand !== brand) {
                article.brand = brand
            }
            articleFound = article // remplacement [] = [new ]
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

