const express = require("express")

const PORT = 3000
const HOST = '0.0.0.0'

const app = express()

app.get('/', (req, rest) => {
    rest.send("hello world")
})

app.listen(PORT, HOST);

const cors = require("cors")

const bodyParser = require('body-parser');


app.use(cors())

app.use(express.json())
app.use(bodyParser.json());

const conn = require("./db/conn")
conn()

const routes = require("./routes/router")
app.use("/api", routes)
