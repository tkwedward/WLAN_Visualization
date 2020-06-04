const express = require("express")
const path = require("path")
const ejs = require("ejs")
const fs = require("fs")

// const config = require('static/data/ECS152A/chapter1.json')

const app = express();
const port = process.env.PORT || 4000;

function escapeSpecialChars(jsonString) {
    return jsonString
		.replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");

}

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "./solution/static/views"))
app.set("views", path.join(__dirname, "./wlan/static/views"))

app.use(express.static(path.join(__dirname, "./solution")))
app.use(express.static(path.join(__dirname, "./wlan")))

app.get("/", (request, response) => {
	var dataFile = fs.readFileSync(path.join(__dirname, "./solution/static/data/ECS152A/solution.json"), 'utf8');
	dataFile = JSON.stringify(dataFile)
	dataFile = dataFile.replace(/\\n/g, "\\n")
					   .replace(/\\'/g, "\\'")
					   .replace(/\\"/g, '\\"')
					   .replace(/\\&/g, "\\&")
					   .replace(/\\r/g, "\\r")
					   .replace(/\\t/g, "\\t")
					   .replace(/\\b/g, "\\b")
					   .replace(/\\f/g, "\\f");
	dataFile = encodeURIComponent(dataFile)
	dataFile = decodeURIComponent(dataFile)
	dataFile = JSON.parse(dataFile)

	// let solution = JSON.parse(dataFile)
	response.render("index.ejs", {
		pageTitle: dataFile
	})
})


app.get("/wlan", (request, response) => {
	var dataFile = fs.readFileSync(path.join(__dirname, "./wlan/static/data/output.json"), 'utf8');
	dataFile = JSON.stringify(dataFile)
	dataFile = encodeURIComponent(dataFile)
	dataFile = decodeURIComponent(dataFile)
	dataFile = JSON.parse(dataFile)

	// let solution = JSON.parse(dataFile)
	response.render("index.ejs", {
		pageTitle: dataFile
	})
})


app.listen(port, ()=>{
    console.log(`Express server listening on port ${port}`)
})
