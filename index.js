//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const checkPassword = (req, res, next) =>
{
    const data = req.body;//example: { street: 'Daiganjichou', pet: 'Jollibee and Chikka' };
    console.log(`data: ${JSON.stringify(data)}`);
    const keys = Object.keys(data); //this will give us an array of the keys in the data object. In this case, it will be ["street", "pet"].
    console.log(`the POST keys are ${keys}`);//["password"]

    let enteredPassword = req.body["password"];
    
    if (enteredPassword ==="ILoveProgramming")
    {
        console.log("Correct password!");

        req.IsPasswordCorrect = true;
    }
    else
    {
        console.log("Incorrect password!");
         req.IsPasswordCorrect = false;
    }
    next();
}


app.use(bodyParser.urlencoded({ extended: true }));//extended: true allows for rich objects and arrays to be encoded into the URL-encoded format, which can be useful for complex data structures.
app.use(bodyParser.json());

app.use(checkPassword);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
    console.log(`req.body: ${JSON.stringify(req.body)}`);

    if(req.IsPasswordCorrect === true)
    {
        res.sendFile(__dirname + "/public/secret.html");
    }
    else
    {
        res.send("<h1>Incorrect password!</h1><p>Try again.</p>");
    }
});
