const express = require("express");
const path = require("path");

const app = express();

let port = 8080;

app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/JS")));

app.set("view engine", "ejs"); // to use ejs we have to write it. express internally access it.
app.set("views", path.join(__dirname, "/views"));

app.listen(port, ()=> {
    console.log(`Listening on port ${port}...`);
});

app.get("/", (req, res) => {
    // res.send("This is our home path.");
    res.render("home.ejs");
});

app.get("/hello", (req, res) => {
    res.send("Hello");
});

// Interpolation Syntax:
// -> Interpolation syntax refers to embedding expressions into marked up text.
// => ejs helps us to make our code dynamic.
// refers to ejs.co documentations. here we can find a lot of tags.
// For ex:
/*
    <h3> The value of 1+2 is: <%=  1+2 %></h3>
    <h3><%= ["Hello", "bonjour", "namaste"][0]  %></h3>
    <h3><%= ["Hello", "bonjour", "namaste"][1]  %></h3>
    <h3><%= ["Hello", "bonjour", "namaste"][2]  %></h3>
*/
// There are a lot of tags like this. For that refer to ejs.co docs.


///// Passing Data to EJS:

app.get("/rolldice", (req, res) => {
    // for this rout we are going to make a new template in views folder.
    // res.render("rolldice.ejs");

    // now, this value is given by us in rolldice.js. But this value will come from database and then we have to use it. 
    // So, first we can store the value in a variable
    let diceVal = Math.floor(Math.random() * 6) + 1;
    // res.render("rolldice.ejs", {num: diceVal}); // we just can write diceval
    res.render("rolldice.ejs", { diceVal });

});


/// Lets do an small activity. Creating a basic instagram ejs

// app.get("/ig/:username", (req, res) => {
//     let { username } = req.params;
//     console.log(username);
//     res.render("instagram.ejs", { username });
// });


// Conditional Statements use in EJS:

// for writing loops, conditional statements we use scriplet tag 
/**
 * <% if(diceVal == 6) { %>
    <h2>Nice! Roll the dice again.</h2>
   <% } %>
 */



/// Lets learn the use of loops in EJS:
// -> lets make a list of followers in our instagram.ejs file.

// app.get ("/ig/:username", (req, res) => {
//     // console.log(req.params);
//     let { username } = req.params;
//     let followers = ["adams", "bob", "pine", "bleq", "astr", "boxo"];
//     res.render("instagram.ejs", { username, followers });
// });

/*
in instagram.ejs file, the code is like :
<body>
    <h2>This page belongs to @<%= username %></h2>
    <button>Follow</button>
    <button>Message</button>

    <h3>Accounts that follow you: </h3>
    <ul>
        <% for (let name of followers) { %>
            <li><%= name %></li>
        <% } %>
    </ul>
</body>
</html>
*/


//// Instagram data with EJS using data.json file:

app.get ("/ig/:username", (req, res) => {
    let { username } = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    console.log(data);
    if (data) {
        res.render("instagram.ejs", { data});

    } else {
        res.render("error.ejs");
    }
});



//// Lets learn how to serve static files:
// -> till now we have learnt that how to render html codes, but if we want to render a lot of html code with css and js then we use static files.

// -> here, we have added two public files and have added that with instagram.js file.


///// Lets talk and learn about includes.
/// -> When we use sub templates under templates there we use sub templates.
// -> let say in every html code we have to write same things in the head section. So if we don't want to write this everytime, then we just have to use <%- include("includes/head.ejs") %>



