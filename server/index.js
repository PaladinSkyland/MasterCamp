const express = require('express')
const app = express()
const port = 5000


app.get("/api", (req,res) => {
    res.send({"test": "lucas"})
})

app.listen(port, () => {
    console.log("listening on port", port)
})